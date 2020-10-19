import { Controller, Post, UseGuards, Get, Body, Request, Session } from '@nestjs/common';
import { AuthLocalService } from './local/local.service';
import { LocalSignupDTO } from './local/dto/local.signup.dto';
import { LocalSigninDTO } from './local/dto/local.signin.dto';
import { BearerResponse } from './interfaces/BearerResponse';
import { AuthJwtGuard } from './jwt/jwt.guard';
import { AuthTwitterGuard } from './twitter/twitter.guard';

@Controller()
export class AuthController {
  constructor(private readonly authLocalService: AuthLocalService) {}

  @UseGuards(AuthJwtGuard)
  @Get('auth/logout')
  async logout(): Promise<string> {
    return 'ok';
  }

  @Post('auth/local/sign_in')
  async login(@Body() dto: LocalSigninDTO): Promise<BearerResponse> {
    return this.authLocalService.signIn(dto);
  }

  @Post('auth/local/sign_up')
  async signUp(@Body() dto: LocalSignupDTO): Promise<BearerResponse> {
    return this.authLocalService.signUp(dto);
  }

  @UseGuards(AuthTwitterGuard)
  @Get('auth/twitter/sign_in')
  async twitterSignIn() {}

  @UseGuards(AuthTwitterGuard)
  @Get('auth/twitter/callback')
  async twitterSigninCallback(@Request() req): Promise<any> {
    return req.user
  }
}
