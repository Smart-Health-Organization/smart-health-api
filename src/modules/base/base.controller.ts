import { Controller, Get, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Tokens } from '@utils/tokens';
import { Operations } from './base.operations';

@ApiBearerAuth()
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
