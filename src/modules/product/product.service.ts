import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createProductDto } from 'src/common/dto/colums/product/create.product.dto';
import { updatePropertyDto } from 'src/common/dto/colums/product/update.product.dto';
import { Product } from 'src/entities/product/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly userRepository: Repository<Product>,
  ) {}
  async create(createProductDto: createProductDto): Promise<Product> {
    const result = this.userRepository.create(createProductDto);
    console.log('result : ', result);
    return await this.userRepository.save(result);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const result = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!result) throw new NotFoundException();
    return result;
  }

  async update(id: number, dataForm: updatePropertyDto) {
    await this.userRepository.update(id, dataForm);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.userRepository.delete(+id);
  }
}
