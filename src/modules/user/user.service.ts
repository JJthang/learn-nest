import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from 'src/common/dto/colums/user/create.user.dto';
import { paginationTdo } from 'src/common/dto/pagination.tdo';
import { User } from 'src/entities/user/user.entity';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constant';
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

  async updateHashedRefreshToken(userId: number, hashedRefreshToken: any) {
    return await this.userRepository.update(
      { id: userId },
      { hashedRefreshToken },
    );
  }

  async findAll(query: paginationTdo) {
    const users = await this.userRepository.find({
      relations: ['posts'],
      skip: query.skip,
      take: query.limit ?? DEFAULT_PAGE_SIZE,
    });
    return {
      status: 200,
      length: users.length,
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

  async findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async findByEmaiL(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
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
