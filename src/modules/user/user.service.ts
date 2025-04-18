import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  create(createUserDto: any) {
    return `This action adds a new user ${createUserDto} `;
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

  update(id: number, updateUserDto: any) {
    return `This action updates a #id user id: ${id}, updateUserDto: ${updateUserDto} `;
  }

  remove(id: number) {
    return `This action removes a #id user  id: ${id} `;
  }
}
