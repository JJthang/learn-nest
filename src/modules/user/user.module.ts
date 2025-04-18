import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [AuthService, UserService],
  exports: [],
})
export class UserModule {}
