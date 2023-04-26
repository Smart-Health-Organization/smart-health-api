import { ExameItemOperations } from '@modules/exame-item/exame-item.operations';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ExameResponseDto } from '@app/types/dtos/exame.response.dto';
import { ExameItem } from '@app/types/entities/exame-item.entity';
import { User } from '@app/types/entities/user.entity';
import { Tokens } from '@app/utils/tokens';
import { ExameItemsMapResponseType } from '@modules/exame/type/exame-items-map.response.type';
import { MetricaOperations } from '@modules/metrica/metrica.operations';
import { PdfManipulatorOperations } from '@modules/pdf-manipulator/pdf-manipulator.operations';
import { Repository } from 'typeorm';
import { Exame } from '../../types/entities/exame.entity';
import { ExameAssembler } from './assembler/exameAssembler';
import { ExameOperations } from './exame.operations';
import { ExamesAndExameItemsResponseType } from './type/exame-and-exame-items.response.type';

@Injectable()
export class ExameService implements ExameOperations {
  constructor(
    @InjectRepository(Exame)
    private exameRepository: Repository<Exame>,
    @Inject(Tokens.EXAME_ITEM_OPERATIONS)
    private readonly exameItemservice: ExameItemOperations,
    @Inject(Tokens.METRICA_OPERATIONS)
    private readonly metricaService: MetricaOperations,
    @Inject(Tokens.PDF_OPERATIONS)
    private readonly pdfManipulatorService: PdfManipulatorOperations,
  ) {}
  async createExame(user: User, data: string): Promise<ExameResponseDto> {
    const dateParts = data.split('/');
    const year = parseInt(dateParts[2], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[0], 10);
    const formattedFata = new Date(year, month, day);
    const exame = this.exameRepository.create({
      user,
      data: formattedFata.toString(),
    });
    const exameSaved = await this.exameRepository.save(exame);
    if (!exameSaved) {
      throw new InternalServerErrorException('Exame was not created');
    }
    const exameDto = ExameAssembler.assembleCreateExameToDto(exameSaved);
    return exameDto;
  }

  async getExames(): Promise<ExameResponseDto[]> {
    const exames = await this.exameRepository.find({ relations: ['user'] });
    const examesDto = ExameAssembler.assembleExamesToDto(exames);
    return examesDto;
  }

  async getExameById(id: string): Promise<Exame> {
    const exame = await this.exameRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!exame) {
      throw new NotFoundException('Exame not found');
    }
    return exame;
  }

  async getExamesByUserId(
    userId: string,
  ): Promise<ExamesAndExameItemsResponseType> {
    const exames = await this.exameRepository.find({
      where: {
        user: { id: parseInt(userId) },
      },
    });

    const exameItensMap = new Map<Exame, ExameItem[]>();
    for (const exame of exames) {
      const exameItems = await this.exameItemservice.getExameItemsByExameId(
        exame.id,
      );
      exameItensMap.set(exame, exameItems);
    }
    return ExameAssembler.assembleExameAndExameItemsToDto(exameItensMap);
  }

  async getExameItemsFromAllExamsByUser(
    userId: string,
  ): Promise<ExameItemsMapResponseType> {
    const exames = await this.getExamesByUserId(userId);
    const examesPorData = exames.sort((a, b) => {
      const dataA = new Date(a.data);
      const dataB = new Date(b.data);
      return dataB.getTime() - dataA.getTime();
    });
    const itensMap = new Map<string, any[]>();
    examesPorData.forEach((exame) => {
      exame.itens.forEach((item) => {
        let itemaSerAdicionado = null;
        if (!itensMap.get(item.metrica)) {
          itensMap.set(item.metrica, []);
          itemaSerAdicionado = {
            data: exame.data,
            medida: item.medida,
            isAtual: true,
            isAlterado: item.resultado.alterado,
          };
        } else {
          itemaSerAdicionado = {
            data: exame.data,
            medida: item.medida,
            isAtual: false,
            isAlterado: item.resultado.alterado,
          };
        }
        const conteudo = itensMap.get(item.metrica);
        conteudo.push(itemaSerAdicionado);
      });
    });

    return { data: Object.fromEntries([...itensMap]) };
  }

  async readExamesBasedOnMetricas(file: any) {
    let metricas = await this.metricaService.getMetricas();
    const unidadeMetricasSet = new Map<string, string>();
    metricas.forEach((metrica) => {
      const { nome, unidade } = metrica;
      unidadeMetricasSet.set(nome, unidade);
    });
    const metricasByName = metricas.map((metrica) => {
      return metrica.nome;
    });
    const map = new Map<string, any>();
    const pdfPagesStringArray = await this.pdfManipulatorService.readPdf(file);
    let itemEncontrado = '';
    for (let i = 0; i < pdfPagesStringArray.length; i++) {
      for (let j = 0; j < metricasByName.length; j++) {
        if (
          pdfPagesStringArray[i]
            .toUpperCase()
            .split(' ')
            .includes(metricasByName[j])
        ) {
          itemEncontrado = metricasByName[j];
          break;
        }
      }
      if (itemEncontrado !== '') {
        if (itemEncontrado === 'H.D.L.') {
          itemEncontrado = itemEncontrado.replace(/\./g, '');
          pdfPagesStringArray[i] = pdfPagesStringArray[i].replace(
            'H.D.L.',
            itemEncontrado,
          );
        }
        const regex = new RegExp(
          `\\b${itemEncontrado}\\b.*?R\\s*E\\s*S\\s*U\\s*L\\s*T\\s*A\\s*D\\s*O\\s*:\\s*(\\d+)|\\b${itemEncontrado}\\b.*?\\bR\\s*E\\s*S\\s*U\\s*L\\s*T\\s*A\\s*D\\s*O\\s*(\\d+(?:[.,]\\d+)?)`,
          'gi',
        );

        const match = regex.exec(pdfPagesStringArray[i]);
        if (match) {
          const valor = match[1] || match[2];
          const unidade = unidadeMetricasSet.get(itemEncontrado);
          map.set(itemEncontrado, { valor, unidade });
        }
      }
    }
    return map;
  }

  // async updateExame(id: string, data: UpdateExameDto): Promise<any> {
  //   const exame = await this.getExameById(id);
  //   await this.exameRepository.update(exame, { ...data });

  //   //cria-se esse objeto porque em update faltam propriedades do tipo exame
  //   const exameUpdated = this.exameRepository.create({ ...exame, ...data });
  //   return exameUpdated;
  // }

  // async deleteExame(id: string): Promise<boolean> {
  //   await this.getExameById(id);
  //   const deleted = await this.exameRepository.delete(id);
  //   if (deleted) return true;
  //   return false;
  // }
}
