import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post/post.entity';
import { User } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createPostDto: { title: string; userId: number }) {
    console.log(createPostDto.userId, createPostDto.title, createPostDto);

    const user = await this.userRepository.findOneBy({
      id: createPostDto.userId,
    });

    if (!user) throw new NotFoundException('User not found 3');

    const post = this.postRepository.create({
      title: createPostDto.title,
      user: user,
    });
    return this.postRepository.save(post);
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #id post`;
  }

  update(id: number, updatePostDto: { title: string; userId: number }) {
    return `This action updates a #id post`;
  }

  remove(id: number) {
    return `This action removes a #id post`;
  }
}
