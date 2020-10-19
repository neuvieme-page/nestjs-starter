import { Controller, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/auth.signup.dto';
import { SignInDTO } from './dto/auth.signin.dto';
import { BearerResponse } from './interfaces/BearerResponse';
import { JwtAuthGuard } from './jwt.auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('auth/logout')
  async logout(): Promise<string> {
    return 'ok';
  }

  @Post('auth/sign_in')
  async login(@Body() signInDTO: SignInDTO): Promise<BearerResponse> {
    return this.authService.signIn(signInDTO);
  }

  @Post('auth/sign_up')
  async signUp(@Body() signUpDTO: SignUpDTO): Promise<BearerResponse> {
    return this.authService.signUp(signUpDTO);
  }
}
