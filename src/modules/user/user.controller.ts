import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Tokens } from '@utils/tokens';
import { CreateUserDto } from 'src/types/dtos/create-user.dto';
import { UpdateUserDto } from 'src/types/dtos/update-user.dto';
import { User } from 'src/types/entities/user.entity';
import { Operations } from './user.operations';

@Controller('users')
export class UserController {
  constructor(
    @Inject(Tokens.USER_OPERATIONS) private readonly service: Operations,
  ) {}

  @Get()
  getUsers() {
    return this.service.getUsers();
  }

  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    const user = await this.service.createUser(data);
    return user;
  }

  @Patch('/:id')
  async updateUser(
    @Body() data: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<User> {
    const user = await this.service.updateUser(id, data);
    return user;
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.service.getUserById(id);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    return this.service.deleteUser(id);
  }
}
