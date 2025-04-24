import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import refreshJwtConfig from 'src/configs/refresh-jwt.config';

// Tạo một chiến lược xác thực tên là 'refresh-jwt', dùng để xác
// Thực refresh token thông qua header Authorization: Bearer <token>
@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: refreshJwtConfiguration.secret!,
    });
  }
  validate(payload: { sub: string }) {
    return {
      id: payload.sub,
    };
  }
}
