import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO } from './dto/auth.signup.dto';
import { SignInDTO } from './dto/auth.signin.dto';
import { User } from '../users/user.entity';
import { BearerResponse } from './interfaces/BearerResponse';
import { encrypt, compare } from './helpers/encryption';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signIn({ email, password }: SignInDTO): Promise<BearerResponse | null> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();

    if (!user) throw new NotFoundException();

    const isAuthenticate = await compare(password, user.password);
    if (!isAuthenticate) throw new UnauthorizedException();

    const payload = { id: user.id };

    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(signUpDTO: SignUpDTO): Promise<BearerResponse | null> {
    signUpDTO.password = await encrypt(signUpDTO.password);
    const user = await this.usersService.create(signUpDTO);
    if (!user) return null;

    const payload = { id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
