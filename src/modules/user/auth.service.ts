import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  create() {
    return 'This action adds a new auth';
  }
  getAuth(id: number, chart: boolean) {
    return {
      status: 200,
      data: {
        message: `this auth for u and now u can login id : ${id} chart: ${chart}`,
      },
    };
  }
}
