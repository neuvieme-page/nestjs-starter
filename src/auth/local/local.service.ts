import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LocalSignupDTO } from './dto/local.signup.dto';
import { LocalSigninDTO } from './dto/local.signin.dto';
import { User, UserRole } from '../../user/user.entity';
import { Identity } from '../../identity/identity.entity';
import { BearerResponse } from './../interfaces/BearerResponse';
import { encrypt, compare } from './../helpers/encryption';

@Injectable()
export class AuthLocalService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Identity)
    private identitiesRepository: Repository<Identity>,
  ) {}

  async signIn({ email, password }: LocalSigninDTO): Promise<BearerResponse | null> {
    const user = await this.usersRepository.findOne({
      email
    })

    if (!user) throw new NotFoundException();

    const identity = await this.identitiesRepository.findOne({
      user,
      provider: 'local'
    })
    if (!identity) throw new UnauthorizedException('Cannot signin, there is no user registered');

    const isAuthenticate = await compare(password, identity.secret);
    if (!isAuthenticate) throw new UnauthorizedException();

    const payload = { id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp({ firstName, lastName, password, email }: LocalSignupDTO): Promise<BearerResponse | null> {
    const encryptPassword = await encrypt(password);
    let user = await this.usersRepository.findOne({
      email
    })

    if (!user) {
      user = await this.usersRepository.create({
        firstName,
        lastName,
        email,
        role: UserRole.USER
      });
      user = await this.usersRepository.save(user)
    }

    if (!user) return null;
    
    let identity = await this.identitiesRepository.findOne({
      user,
      provider: 'local',
    })

    if (identity) {
      throw new UnauthorizedException('User already sign_up')
    }

    identity = await this.identitiesRepository.create({
      user,
      uid: '',
      secret: encryptPassword,
      provider: 'local'
    })
    identity = await this.identitiesRepository.save(identity)

    const payload = { id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
