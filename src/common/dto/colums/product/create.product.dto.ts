import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createProductDto {
  @IsNotEmpty()
  @IsString()
  name_product: string;

  @IsNotEmpty()
  @IsNumber()
  price_product: number;

  @IsString()
  desc_product: string;

  @IsNumber()
  @IsNotEmpty()
  quantity_product: number;

  // @IsString()
  // created_at: Date;

  // @IsString()
  // updated_at: Date;
}
