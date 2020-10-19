import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { User } from './user.entity';

@Controller()
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('users/me')
  async me(@Request() req): Promise<User> {
    return req.user;
  }
}
