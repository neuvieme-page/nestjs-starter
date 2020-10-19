import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthJwtGuard } from 'src/auth/jwt/jwt.guard';
import { User } from './user.entity';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('users')
@Controller()
export class UserController {
  @UseGuards(AuthJwtGuard)
  @Get('users/me')
  @ApiHeader({name: 'Bearer', description: 'Token for authentication'})
  @ApiResponse({ type: User, status: 200, description: 'The found record' })
  async me(@Request() req): Promise<User> {
    return req.user;
  }
}
