import { Controller, Get, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Tokens } from '@utils/tokens';
import { MetricaOperations } from './metrica.operations';

@ApiBearerAuth()
@ApiTags('Metricas')
@Controller()
export class MetricaController {
  constructor(
    @Inject(Tokens.METRICA_OPERATIONS)
    private readonly service: MetricaOperations,
  ) {}

  @Get()
  getExames() {
    return this.service.getMetricas();
  }
}
