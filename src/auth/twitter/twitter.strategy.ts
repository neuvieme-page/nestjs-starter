// import { ExtractJwt, Strategy } from 'passport-jwt';
import { Strategy } from 'passport-twitter'
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { configService } from '../../config/config.service';
import { IdentityService } from 'src/identity/identities.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy) {
  constructor(
    private identityService: IdentityService,
    private jwtService: JwtService
  ) {
    super({ 
      consumerKey: configService.getProvider('twitter').apiKey,
      consumerSecret: configService.getProvider('twitter').apiSecret,
      callbackURL: configService.getProvider('twitter').callbackURL,
      includeEmail: true
    });
  }

  async validate(token: string, secret: string, profile) {
    const user = await this.identityService.create({
      secret,
      email: profile['_json'].email,
      firstName: profile['_json'].name,
      lastName: '',
      nickName: profile['_json'].screen_name,
      provider: 'twitter',
      uid: token,
      user: null
    })
  
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
