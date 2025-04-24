import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RefreshAuthGuard } from 'src/common/guards/refresh-auth/refresh-auth.guard';

interface CreateAuthDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  create(
    @Request() req: { user: { id: string } },
    @Body() createAuthDto: CreateAuthDto,
  ) {
    return this.authService.login(req.user);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshAuthGuard)
  @Post('refresh-token')
  refreshToken(@Req() req: { user: { id: string } }) {
    console.log('req : ', req.user);
    return this.authService.refreshToken(req.user.id);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: CreateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
