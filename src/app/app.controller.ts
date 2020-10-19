import { Controller, Get } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
