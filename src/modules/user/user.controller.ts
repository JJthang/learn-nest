import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/common/dto/form.dto';
import { ParamIdDto } from 'src/common/dto/param.dto';
import { HeaderDto } from 'src/common/dto/header.dto';
import { createUserDto } from 'src/common/dto/colums/user/create.user.dto';
import { paginationTdo } from 'src/common/dto/pagination.tdo';
import { jwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  // whitelist: loại bỏ các trường không nằm trong CreateUserDto
  async create(@Body() createUserDto: createUserDto) {
    await this.userService.create(createUserDto);
    return {
      message: 'create success fully',
    };
  }
  @Put()
  @UsePipes(new ValidationPipe())
  updateUser(@Body() dto: UserDto) {
    return { message: 'User updated', data: dto };
  }

  @UseGuards(jwtAuthGuard)
  @Get()
  findAll(@Query() query: paginationTdo) {
    return this.userService.findAll(query);
  }
  // , @Query('chart', ParseBoolPipe) chart: boolean
  @Get(':id')
  findOne(@Param() { id }: ParamIdDto) {
    return this.userService.findOneWithPosts(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: any, @Body() updateUserDto: any) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Req() req: Request,
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() body: { username: string; email: string; password: string },
    header: HeaderDto,
  ) {
    console.log('====================================');
    console.log('req headers: ', header);
    console.log('====================================');
    return this.userService.update(+id, body);
  }

  // @SetMetadata('role', [Role.ADMIN])
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(jwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
