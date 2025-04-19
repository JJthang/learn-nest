import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class HeaderDto {
  @Expose({ name: 'access-token' })
  @IsString({ message: 'Access-Token phải là chuỗi' })
  accessToken: string;
}
