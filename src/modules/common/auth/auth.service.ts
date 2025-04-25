import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import refreshJwtConfig from 'src/configs/refresh-jwt.config';
import { UserService } from 'src/modules/user/user.service';
import * as argon2 from 'argon2';

interface CreateAuthDto {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async login(createAuthDto: { id: number }) {
    const { accessToken, refreshToken } = await this.generateTokens(
      createAuthDto.id,
    );
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.userService.updateHashedRefreshToken(
      createAuthDto.id,
      hashedRefreshToken,
    );

    return {
      id: createAuthDto.id,
      accessToken,
      refreshToken,
    };
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findOne(userId);

    if (!user || !user.hashedRefreshToken)
      throw new UnauthorizedException('Invalid Refresh Token');
    console.log(user.hashedRefreshToken);
    console.log(refreshToken);

    const refreshTokenMatches = await argon2.verify(
      user.hashedRefreshToken,
      refreshToken,
    );
    console.log('refreshTokenMatches : ', refreshTokenMatches);

    if (!refreshTokenMatches)
      throw new UnauthorizedException('Invalid Refresh Token');
    return { id: userId };
  }

  async refreshToken(id: number) {
    const { accessToken, refreshToken } = await this.generateTokens(id);
    const hashedRefreshToken = await argon2.hash(accessToken);
    await this.userService.updateHashedRefreshToken(id, hashedRefreshToken);

    return {
      id: id,
      accessToken,
      refreshToken,
    };
  }

  async generateTokens(userId: number) {
    const payload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload),
      this.jwtService.sign(payload, this.refreshTokenConfig),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmaiL(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isPasswordMatch = await compare(password, user.password as string);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credential');
    }
    return {
      id: user.id,
    };
  }

  async signOut(userId: number) {
    await this.userService.updateHashedRefreshToken(userId, null);
    return {
      message: 'Account logged out successfully',
    };
  }
}
