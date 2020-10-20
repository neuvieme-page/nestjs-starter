import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { LocalSignupDTO } from 'src/auth/local/dto/local.signup.dto';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private connection: Connection,
  ) {}

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<User> {
    return this.repository.findOne(id);
  }

  async create(dto: LocalSignupDTO): Promise<User> {
    const user = this.repository.create(dto);
    return await this.repository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async createMany(users: User[]) {
    await this.connection.transaction(async manager => {
      for (let i = 0; i < users.length; i++) {
        await manager.save(users[i]);
      }
    });
  }
}
