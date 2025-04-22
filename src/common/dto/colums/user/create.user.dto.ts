import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  bio: string;
}

export class createUserDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3, { message: 'Password phải có ít nhất 3 ký tự.' })
  @Matches(/(?=.*[a-z])/, {
    message: 'Password phải chứa ít nhất một chữ thường.',
  })
  password: string;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile: CreateProfileDto;
}
