import { Injectable } from '@nestjs/common';
import { Identity } from './identity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/users/user.entity';
import { IdentityCreateDTO } from './dto/identity.create.dto' 

@Injectable()
export class IdentityService {
  private readonly identities: Identity[];

  constructor(
    @InjectRepository(Identity)
    private repository: Repository<Identity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async create(dto: IdentityCreateDTO): Promise<User> {
    let user = await this.userRepository.findOne({
      email: dto.email
    })

    if (!user) {
      user = await this.userRepository.create({
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        role: UserRole.USER
      })
      
      user = await this.userRepository.save(user)
    }

    let identity = await this.repository.findOne({
      user,
      provider: 'twitter'
    })

    if (!identity) {
      identity = await this.repository.create({
        uid: dto.uid,
        secret: dto.secret,
        provider: 'twitter',
        user
      })
      identity = await this.repository.save(identity)
    }
    
    return user;
  }
}
