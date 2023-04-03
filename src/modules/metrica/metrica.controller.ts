import { Controller, Get, Inject } from '@nestjs/common';
import { Tokens } from '@utils/tokens';
import { MetricaOperations } from './metrica.operations';

@Controller('metricas')
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
