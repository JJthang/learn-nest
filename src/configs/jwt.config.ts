import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    global: true,
    secret: '06b88060e569446ab2cebe13680ee68bc37e30b5a6b7fc1287f26cda3b60ddb8',
    signOptions: { expiresIn: '60s' },
  }),
);
