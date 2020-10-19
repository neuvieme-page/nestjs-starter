import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.auth.guard';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

console.log(process.env.JWT_KEY);
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'shhhh',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, LocalAuthGuard],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
