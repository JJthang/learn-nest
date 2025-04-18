import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Field username is required hehe' })
  @Length(3, 20, {
    message: 'Field username must be between 3 and 20 characters',
  })
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 32)
  password: string;
}

export class UserDto {
  @IsNotEmpty({ groups: ['create'] })
  @Length(3, 20, {
    groups: ['create'],
    message: 'Username must be between 3 and 20 characters',
  })
  @IsOptional({ groups: ['update'] })
  username?: string;

  // Chỉ validate khi tạo (create)
  @IsNotEmpty({ groups: ['create'] })
  @IsEmail({}, { groups: ['create'] })

  // Custom validate khi update: không được có email
  @IsOptional({ groups: ['update'] })
  email?: string;

  @IsNotEmpty({ groups: ['create'] })
  @Length(6, 100, { groups: ['create'] })
  @IsOptional({ groups: ['update'] })
  password?: string;
}
