import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleAuthConfig from 'src/configs/google-auth.config';
import { AuthService } from '../auth.service';
import { UserGoogle } from 'src/types/common/auth.type';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleAuthConfig.KEY)
    private readonly googleConfig: ConfigType<typeof googleAuthConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: googleConfig.clientId,
      clientSecret: googleConfig.clientSecret,
      callbackURL: googleConfig.callbackUrl,
      scope: ['email', 'profile'],
      // passReqToCallback: true,
    });
  }
  // async
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: UserGoogle,
    done: VerifyCallback,
  ) {
    console.log('profile : ', profile);
    const user = await this.authService.validateGoogleUser({
      email: profile.emails[0].value,
      firstname: profile.name.givenName,
      lastname: profile.name.familyName,
      password: '',
    });
    done(null, user);
  }
}
