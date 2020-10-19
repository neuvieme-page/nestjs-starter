import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthJwtGuard } from 'src/auth/jwt/jwt.guard';
import { User } from './user.entity';
import { configService } from '../config/config.service';

@Controller()
export class UserController {
  @UseGuards(AuthJwtGuard)
  @Get('users/me')
  async me(@Request() req): Promise<User> {
    return req.user;
  }

  @Get('users/test')
  async test(@Request() req): Promise<string> {
    return JSON.stringify(configService.getTypeOrmConfig());
  }
}
