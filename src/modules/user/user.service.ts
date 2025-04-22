import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from 'src/common/dto/colums/user/create.user.dto';
import { User } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: createUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  update(id: number, updateUserDto: any) {
    return {
      message: `This action updates a #id user id: ${id}, updateUserDto: ${updateUserDto} `,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: updateUserDto,
    };
  }

  async findAll(id: number) {
    const users = await this.userRepository.find({ relations: ['posts'] });
    return {
      status: 200,
      message: `This action returns all users   id : ${id}`,
      data: users,
    };
  }

  async findOneWithPosts(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['posts'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  remove(id: number) {
    return `This action removes a #id user  id: ${id} `;
  }
}
