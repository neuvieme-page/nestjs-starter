import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthLocalService } from './local.service';
import { IdentityService } from 'src/identity/identity.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthLocalService,
  ) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.signIn({ email, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
