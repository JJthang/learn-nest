import { registerAs } from '@nestjs/config';

export default registerAs('google-auth', () => ({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackUrl: process.env.GOOGLE_CALLBACK_URL,
}));
// 665270752500-6ardvvsk9sgm0m8n0ugml6f584q17a47.apps.googleusercontent.com

// clientId: process.env.GOOGLE_CLIENT_ID,
// clientSecret: process.env.GOOGLE_SECRET,
// callbackUrl: process.env.GOOGLE_CALLBACK_URL,
