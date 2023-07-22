import { Controller, Get, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Tokens } from '@utils/tokens';
import { ExameCompartilhadoOperations } from './exame-compartilhado.operations';

@ApiBearerAuth()
@ApiTags('Exame Compartilhado')
@Controller('exame-compartilhado')
export class ExameCompartilhadoController {
  constructor(
    @Inject(Tokens.EXAME_COMPARTILHADO_OPERATIONS)
    private readonly service: ExameCompartilhadoOperations,
  ) {}

  @Get()
  getHello() {
    return;
  }
}
