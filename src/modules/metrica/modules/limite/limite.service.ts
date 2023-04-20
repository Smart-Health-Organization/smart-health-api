import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Limite } from '@app/types/entities/limite.entity';
import { LimiteOperations } from '@modules/metrica/modules/limite/limite.operations';
import { Repository } from 'typeorm';

@Injectable()
export class LimiteService implements LimiteOperations {
  constructor(
    @InjectRepository(Limite)
    private limiteRepository: Repository<Limite>,
  ) {}

  async getLimitesByMetricaId(metricaId: string): Promise<any> {
    const limites = await this.limiteRepository.find({
      where: {
        metrica: { id: parseInt(metricaId) },
      },
    });
    if (!limites) {
      throw new NotFoundException('Exame not found');
    }
    return limites;
  }
}
