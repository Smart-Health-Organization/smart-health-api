import { AntropometriaOperations } from '@modules/metas/modules/antropometria/base/antropometria.operations';
import { Controller, Get, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Tokens } from '@utils/tokens';

@ApiBearerAuth()
@ApiTags('Base')
@Controller('helloworld')
export class AntropometriaController {
  constructor(
    @Inject(Tokens.ANTROPOMETRIA_OPERATIONS)
    private readonly service: AntropometriaOperations,
  ) {}

  @Get()
  getHello() {
    return this.service.getHello();
  }
}
