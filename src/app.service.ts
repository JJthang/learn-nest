import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `process.env.JWT_SECRET ${process.env.JWT_SECRET}`;
  }
}
