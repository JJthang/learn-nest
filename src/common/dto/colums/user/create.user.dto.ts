import { IsNotEmpty, IsString } from 'class-validator';

export class createUserDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}
