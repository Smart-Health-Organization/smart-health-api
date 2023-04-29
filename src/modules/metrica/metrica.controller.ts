import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Tokens } from '@utils/tokens';
import { MetricaOperations } from './metrica.operations';

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
