import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Metrica } from '@app/types/entities/metrica.entity';
import { MetricaOperations } from '@modules/metrica/metrica.operations';
import { Repository } from 'typeorm';

@Injectable()
export class MetricaService implements MetricaOperations {
  constructor(
    @InjectRepository(Metrica)
    private metricaRepository: Repository<Metrica>,
  ) {}

  async getMetricas(): Promise<Metrica[]> {
    const metricas = await this.metricaRepository.find();
    return metricas;
  }

  async getMetricaByName(nome: string): Promise<Metrica> {
    const metrica = await this.metricaRepository.findOne({
      where: { nome },
    });
    return metrica;
  }
}
