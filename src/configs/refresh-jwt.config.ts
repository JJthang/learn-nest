import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export default registerAs(
  'refresh-jwt',
  (): JwtSignOptions => ({
    secret: '63a573d0b41155ddef89dc343d8b9623f9f915350469c7ca35c91468d24f5aa9',
    expiresIn: '1d',
  }),
);
