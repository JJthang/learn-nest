import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { LocalStrategy } from './strategies/local.strategies';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/configs/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategies';
import { ConfigModule } from '@nestjs/config';
import refreshJwtConfig from 'src/configs/refresh-jwt.config';
import { RefreshJwtStrategy } from './strategies/refresh.strateies';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register(jwtConfig()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
})
export class AuthModule {}
