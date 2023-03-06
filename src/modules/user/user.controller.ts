import { Body, Controller, Get, HttpCode, Inject, Post } from '@nestjs/common';
import { Tokens } from 'src/utils/tokens';
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
  @HttpCode(204)
  createtUser(
    @Body()
  ) {
    return this.service.getUsers();
  }
}