import { CreateExameItemInsertDtoArray } from '@app/types/dtos/insert/exame-item.insert.dto';
import { ExameItem } from '@app/types/entities/exame-item.entity';
import { ResultadoExameItem } from '@app/types/entities/resultado-exame.entity';
import { Usuario } from '@app/types/entities/usuario.entity';
import { Tokens } from '@app/utils/tokens';
import { MetricaOperations } from '@modules/metrica/metrica.operations';
import { LimiteOperations } from '@modules/metrica/modules/limite/limite.operations';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    user: Usuario,
    exame: Exame,
    exameItens: CreateExameItemInsertDtoArray,
  ): Promise<any> {
    const allExameItensSaved = [];

    for (const exameItem of exameItens) {
      const metrica = await this.metricaService.getMetricaByName(
        exameItem.metrica.toUpperCase(),
      );
      const limites = metrica
        ? await this.limiteService.getLimitesByMetricaId(metrica.id.toString())
        : null;
      const limiteFiltered = limites?.filter(
        (limite) =>
          limite.sexo === user.sexo &&
          user.idade >= limite.idadeInicio &&
          user.idade <= limite.idadeFim,
      );

      const resultadoExameItem = new ResultadoExameItem();

      resultadoExameItem.limite = limiteFiltered ? limiteFiltered[0] : null;

      resultadoExameItem.alterado = limiteFiltered
        ? exameItem.medida < limiteFiltered[0].alto &&
          exameItem.medida > limiteFiltered[0].baixo
          ? false
          : true
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

  verifyDuplicateMetrics(array: CreateExameItemInsertDtoArray) {
    const metrics: string[] = array.map((item) => item.metrica);
    const duplicates: string = metrics
      .reduce(
        (acc: string[], currentValue: string, index: number, arr: string[]) => {
          if (
            arr.indexOf(currentValue) !== index &&
            acc.indexOf(currentValue) === -1
          ) {
            acc.push(currentValue);
          }
          return acc;
        },
        [],
      )
      .join(', ');
    if (duplicates) {
      throw new BadRequestException(
        `Não foi possível criar exame pos existem métricas repetidas: [${duplicates}]`,
      );
    }
  }
}
