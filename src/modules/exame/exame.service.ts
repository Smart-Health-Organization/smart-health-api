import { ExameItemOperations } from '@modules/exame-item/exame-item.operations';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ExameResponseDto } from '@app/types/dtos/response/exame.response.dto';
import { ExameItem } from '@app/types/entities/exame-item.entity';
import { Usuario } from '@app/types/entities/usuario.entity';
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
  async createExame(user: Usuario, data: string): Promise<ExameResponseDto> {
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
      throw new BadRequestException('Exame não foi criado');
    }
    const exameDto = ExameAssembler.assembleCreateExameToDto(exameSaved);
    return exameDto;
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
            unidade: item.unidade,
            isAtual: true,
            isAlterado: item.resultado.alterado,
          };
        } else {
          itemaSerAdicionado = {
            data: exame.data,
            medida: item.medida,
            unidade: item.unidade,
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

  async readExamesBasedOnMetricas(file) {
    //busca metricas no banco de dados
    let metricas = await this.metricaService.getMetricas();

    //chama pdf-manipulator e retorna paginas em string
    const pdfPagesStringArray = await this.pdfManipulatorService.readPdf(file);

    //baseado nas paginas e nas metricas recuperadas do banco de dados,
    // monta os itens do exame com seu valor e unidades
    const createdMap = this.populateMapWithItems(pdfPagesStringArray, metricas);
    if (!createdMap.size) {
      throw new BadRequestException('PDF lido mas nenhum item foi encontrado');
    }

    return createdMap;
  }

  populateMapWithItems(pdfPagesStringArray, metricas) {
    //map principal
    const itensMap = new Map<string, { valor: number; unidade: string }>();

    //map contendo unidades de cada metrica
    const unidadeMetricasSet = new Map<string, string>();

    const metricasByName = [];

    metricas.forEach((metrica) => {
      const { nome, unidade } = metrica;
      unidadeMetricasSet.set(nome, unidade);
      metricasByName.push(nome);
    });

    //chama funcao para popular intensMap
    this.createMapBasedOnPdf(
      pdfPagesStringArray,
      metricasByName,
      unidadeMetricasSet,
      itensMap,
    );

    //retorna map
    return itensMap;
  }

  createMapBasedOnPdf(
    pdfPagesStringArray: string[],
    metricasByName: string[],
    unidadeMetricasSet: Map<string, string>,
    itensMap: Map<string, { valor: number; unidade: string }>,
  ) {
    metricasByName = metricasByName.sort((a, b) => a.length - b.length);

    for (let i = 0; i < pdfPagesStringArray.length; i++) {
      let itemEncontrado = [];
      // percorre cada metrica por nome
      for (let j = metricasByName.length - 1; j >= 0; j--) {
        // verifica estrutura de HDL e padroniza
        if (pdfPagesStringArray[i].includes('H.D.L.')) {
          pdfPagesStringArray[i] = pdfPagesStringArray[i].replace(
            'H.D.L.',
            'HDL',
          );
        }

        if (pdfPagesStringArray[i].includes(metricasByName[j])) {
          itemEncontrado.push(metricasByName[j]);
          metricasByName.splice(j, 1);
        }
      }

      //verifica se um item foi encontrado
      if (!!itemEncontrado.length) {
        //passa pelo regex para pegar palavra "resultado" da respectiva medida
        for (let item of itemEncontrado) {
          const regex = new RegExp(
            `${item}.*?R\\s*E\\s*S\\s*U\\s*L\\s*T\\s*A\\s*D\\s*O\\s*:\\s*(\\d+(?:[.,]\\d+)?)|${item}.*?R\\s*E\\s*S\\s*U\\s*L\\s*T\\s*A\\s*D\\s*O\\s*S\\s*:\\s*(\\d+(?:[.,]\\d+)?)|\\b${item}\\b.*?\\bR\\s*E\\s*S\\s*U\\s*L\\s*T\\s*A\\s*D\\s*O\\s*(\\d+(?:[.,]\\d+)?)|\\b${item}\\b\\s+(\\d{1,3}(?:[.,]\\d{1,2})?)\\b`,
            'gi',
          );

          const match = regex.exec(pdfPagesStringArray[i]);
          //verifica match com regex
          if (match) {
            //recupera valor apos a palavra resultado
            let valorEncontrado = match[1] || match[2] || match[3] || match[4];
            const valor = +valorEncontrado.replace(',', '.');

            //recupera a unidade de medida baseado na metrica do banco de dados
            const unidade = unidadeMetricasSet.get(item);

            //popula map principal com metrica do banco, seu valor e unidade do banco de dados
            pdfPagesStringArray[i] = pdfPagesStringArray[i].replace(item, '');
            itensMap.set(item, { valor, unidade });
          }
        }
      }
    }
  }
}
