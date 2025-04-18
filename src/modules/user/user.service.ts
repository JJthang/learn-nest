import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  create(createUserDto: {
    username?: string;
    email?: string;
    password?: string;
  }) {
    return createUserDto;
  }
  update(id: number, updateUserDto: any) {
    return `This action updates a #id user id: ${id}, updateUserDto: ${updateUserDto} `;
  }

  findAll(id: number) {
    return {
      status: 200,
      message: `This action returns all users   id : ${id}`,
    };
  }

  findOne(id: number) {
    return `This action returns a #id user ${id} `;
  }

  remove(id: number) {
    return `This action removes a #id user  id: ${id} `;
  }
}
