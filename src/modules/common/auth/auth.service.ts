import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
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
  ) {}
  login(createAuthDto: { id: string }) {
    return this.jwtService.sign({ sub: createAuthDto.id });
  }

  findAll() {
    return `This action returns all auths`;
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
