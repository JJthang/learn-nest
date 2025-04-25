import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import refreshJwtConfig from 'src/configs/refresh-jwt.config';
import { Request } from 'express';
import { AuthJwtPayload } from 'src/types/auth-jwtPayload';
import { AuthService } from '../auth.service';

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
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: refreshJwtConfiguration.secret!,
      // ignoreExpiration: false: Không bỏ qua thời gian hết hạn (token hết hạn sẽ bị từ chối).
      ignoreExpiration: false,
      // passReqToCallback: Cho phép truyền thêm request vào hàm validate() (ở đây chưa dùng đến nhưng để sẵn).
      passReqToCallback: true,
    });
  }
  validate(req: Request, payload: AuthJwtPayload) {
    const refreshToken = req.get('authorization')?.replace('Bearer', '').trim();
    if (!refreshToken) {
      return;
    }
    const userId = payload.sub;
    return this.authService.validateRefreshToken(userId, refreshToken);
  }
}
