import { ExameItem } from '@app/types/entities/exame-item.entity';
import { ResultadoExameItem } from '@app/types/entities/resultado-exame.entity';
import { Tokens } from '@app/utils/tokens';
import { MetricaOperations } from '@modules/metrica/metrica.operations';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExameItemInsertDto } from 'src/types/dtos/exame-item.insert.dto';
import { Repository } from 'typeorm';
import { Exame } from '../../types/entities/exame.entity';
import { ExameItemOperations } from './exame-item.operations';

@Injectable()
export class ExameItemService implements ExameItemOperations {
  constructor(
    @InjectRepository(ExameItem)
    private exameItemRepository: Repository<ExameItem>,

    @InjectRepository(ResultadoExameItem)
    private resultadoRepository: Repository<ResultadoExameItem>,

    @Inject(Tokens.METRICA_OPERATIONS)
    private readonly metricaService: MetricaOperations,
  ) {}
  async createExameItems(
    exame: Exame,
    exameItens: ExameItemInsertDto[],
  ): Promise<any> {
    const allExameItensSaved = [];
    for (const exameItem of exameItens) {
      const metrica = await this.metricaService.getMetricaByName(
        exameItem.metrica.toUpperCase(),
      );
      const exameItemCreated = await this.exameItemRepository.create({
        exame,
        metrica: exameItem.metrica,
        medida: exameItem.medida,
        unidade: exameItem.unidade,
      });
      const exameSaved = await this.exameItemRepository.save(exameItemCreated);

      allExameItensSaved.push(exameSaved);
    }
    return allExameItensSaved;
  }

  async getExameItemsByExameId(exameId: number): Promise<ExameItem[]> {
    const exameItems = await this.exameItemRepository.find({
      where: {
        exame: { id: exameId },
      },
    });

    return exameItems;
  }
}
