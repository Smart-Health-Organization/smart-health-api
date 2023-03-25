import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Tokens } from '@utils/tokens';
import { Operations } from './base.operations';

@ApiTags('Base')
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
