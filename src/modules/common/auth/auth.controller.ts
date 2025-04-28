import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RefreshAuthGuard } from 'src/common/guards/refresh-auth/refresh-auth.guard';
import { jwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { GoogleAuthGuard } from 'src/common/guards/google-auth/google-auth.guard';
import { Request as RequestExpress, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  create(@Request() req: { user: { id: number } }) {
    console.log('req : ', req.user);
    return this.authService.login(req.user);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(jwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshAuthGuard)
  @Post('refresh-token')
  refreshToken(@Req() req: { user: { id: number } }) {
    return this.authService.refreshToken(req.user.id);
  }

  @UseGuards(jwtAuthGuard)
  @Post('sign-out')
  signOut(@Req() req: { user: { id: number } }) {
    return this.authService.signOut(req.user.id);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req: RequestExpress, @Res() res: Response) {
    const response = await this.authService.login(req.user as { id: number });
    res.redirect(`http://localhost:5173?token=${response.accessToken}`);
  }
}
