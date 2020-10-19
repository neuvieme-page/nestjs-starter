import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserSubscriber } from './user.subscriber';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserSubscriber],
  exports: [UsersService, TypeOrmModule],
  controllers: [UserController],
})
export class UsersModule {}
