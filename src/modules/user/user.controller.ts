import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  create(@Body() createUserDto: any) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: { id: number }) {
    console.log('====================================');
    console.log('this ', query.id);
    console.log('====================================');
    return this.userService.findAll(query.id);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('chart', ParseBoolPipe) chart: boolean,
  ) {
    console.log('====================================');
    console.log(typeof id, typeof chart, id, chart);
    console.log('====================================');
    return this.authService.getAuth(+id, chart);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
