import { ExameItem } from '@app/types/entities/exame-item.entity';
import { Limite } from '@app/types/entities/limite.entity';
import { ResultadoExameItem } from '@app/types/entities/resultado-exame.entity';
import { User } from '@app/types/entities/user.entity';
import { Tokens } from '@app/utils/tokens';
import { MetricaOperations } from '@modules/metrica/metrica.operations';
import { LimiteOperations } from '@modules/metrica/modules/limite/limite.operations';
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

    @Inject(Tokens.LIMITE_OPERATIONS)
    private readonly limiteService: LimiteOperations,
  ) {}
  async createExameItems(
    user: User,
    exame: Exame,
    exameItens: ExameItemInsertDto[],
  ): Promise<any> {
    const allExameItensSaved = [];
    for (const exameItem of exameItens) {
      const metrica = await this.metricaService.getMetricaByName(
        exameItem.metrica.toUpperCase(),
      );
      const limites: Limite[] = await this.limiteService.getLimitesByMetricaId(
        metrica.id.toString(),
      );
      const limiteFiltered = limites.filter(
        (limite) =>
          limite.sexo === user.sexo &&
          user.age >= limite.idadeInicio &&
          user.age <= limite.idadeFim,
      );

      const resultadoExameItem = new ResultadoExameItem();

      resultadoExameItem.limite = limiteFiltered[0];

      resultadoExameItem.alterado =
        exameItem.medida < limiteFiltered[0].alto &&
        exameItem.medida > limiteFiltered[0].baixo
          ? false
          : true;

      const resultadoCreated = await this.resultadoRepository.create(
        resultadoExameItem,
      );
      const resultadoSaved = await this.resultadoRepository.save(
        resultadoCreated,
      );
      const exameItemCreated = await this.exameItemRepository.create({
        exame,
        metrica: exameItem.metrica,
        medida: exameItem.medida,
        unidade: exameItem.unidade,
        resultado: resultadoSaved,
      });
      const exameSaved = await this.exameItemRepository.save(exameItemCreated);
      allExameItensSaved.push(exameSaved);
    }
    return allExameItensSaved;
  }

  async getExameItemsByExameId(exameId: number): Promise<ExameItem[]> {
    const exameItems = await this.exameItemRepository.find({
      relations: ['resultado'],
      where: {
        exame: { id: exameId },
      },
    });

    return exameItems;
  }
}
