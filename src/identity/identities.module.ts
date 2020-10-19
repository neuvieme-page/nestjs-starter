import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { Identity } from './identity.entity';
import { IdentityController } from './identity.controller';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Identity, User])],
  providers: [IdentityService],
  exports: [IdentityService, TypeOrmModule],
  controllers: [IdentityController],
})
export class IdentitiesModule {}
