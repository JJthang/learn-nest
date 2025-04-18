import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { UserDto } from 'src/common/dto/form.dto';
import { ParamIdDto } from 'src/common/dto/param.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  // whitelist: loại bỏ các trường không nằm trong CreateUserDto
  create(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }
  @Put()
  @UsePipes(new ValidationPipe())
  updateUser(@Body() dto: UserDto) {
    return { message: 'User updated', data: dto };
  }

  @Get()
  findAll(@Query() query: { id: number }) {
    console.log('====================================');
    console.log('this ', query.id);
    console.log('====================================');
    return this.userService.findAll(query.id);
  }
  // , @Query('chart', ParseBoolPipe) chart: boolean
  @Get(':id')
  findOne(@Param() { id }: ParamIdDto) {
    console.log('====================================');
    console.log(id);
    console.log('====================================');
    return this.authService.getAuth(id, true);
  }

  @Patch(':id')
  update(@Param('id') id: any, @Body() updateUserDto: any) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
