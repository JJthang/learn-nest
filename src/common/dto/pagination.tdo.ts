import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class paginationTdo {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(1)
  skip: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(1)
  limit: number;
}
