import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

// validate params
export class ParamIdDto {
  @Type(() => Number) // chuyển đổi sang number
  @IsInt()
  @Min(0)
  id: number;
}
