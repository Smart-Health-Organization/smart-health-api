import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Tokens } from '@utils/tokens';
import { LimiteOperations } from './limite.operations';
@ApiTags('Metricas - limites')
@Controller()
export class LimiteController {
  constructor(
    @Inject(Tokens.LIMITE_OPERATIONS)
    private readonly service: LimiteOperations,
  ) {}

  @Get(':metricaId')
  getExames(@Param('metricaId') metricaId: string) {
    return this.service.getLimitesByMetricaId(metricaId);
  }
}
