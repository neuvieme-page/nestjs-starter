import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local/local.strategy';
import { UsersModule } from 'src/user/users.module';
import { AuthLocalService } from './local/local.service';
import { AuthLocalGuard } from './local/local.guard';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { TwitterStrategy } from './twitter/twitter.strategy';
import { IdentitiesModule } from 'src/identity/identities.module';
import { configService } from '../config/config.service'

@Module({
  imports: [
    UsersModule,
    IdentitiesModule,
    PassportModule,
    JwtModule.register({
      secret: configService.getSecret(),
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthLocalService, LocalStrategy, TwitterStrategy, JwtStrategy, AuthLocalGuard],
  exports: [AuthLocalService],
  controllers: [AuthController],
})
export class AuthModule {}
