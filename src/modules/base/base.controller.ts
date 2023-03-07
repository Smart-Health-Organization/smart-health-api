import { Controller, Get, Inject } from '@nestjs/common';
import { Tokens } from '@utils/tokens';
import { Operations } from './base.operations';



@Controller('helloworld')
export class BaseController {
  constructor(
    @Inject(Tokens.BASE_OPERATIONS) private readonly service: Operations,
  ) {}

  @Get()
  getHello() {
    return this.service.getHello();
  }
}