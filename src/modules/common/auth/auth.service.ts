import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import refreshJwtConfig from 'src/configs/refresh-jwt.config';
import { UserService } from 'src/modules/user/user.service';

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
  login(createAuthDto: { id: string }) {
    const payload = { sub: createAuthDto.id };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig);
    return {
      id: createAuthDto.id,
      Token: token,
      refreshToken,
    };
  }

  refreshToken(id: string) {
    const payload = { sub: id };
    const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig);
    return {
      id: id,
      refreshToken: refreshToken,
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

  findAll() {
    return `This action returns all auths`;
  }

  findOne(id: number) {
    return `This action returns a #id auth`;
  }

  update(id: number, updateAuthDto: CreateAuthDto) {
    return `This action updates a #id auth`;
  }

  remove(id: number) {
    return `This action removes a #id auth`;
  }
}
