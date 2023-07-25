import { ExameItemsMapResponseData } from '@app/types/dtos/insert/exame-compartilhado.insert.dto';
import { ExameItemCompartilhado } from '@app/types/entities/exame-item-compartilhado.entity';
import { ExameItemCompartilhadoAssembler } from '@modules/exame-item-compartilhado/assembler/exame-item-compartilhado.assembler';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExameCompartilhado } from './../../types/entities/exame-compartilhado.entity';
import { ExameItemCompartilhadoOperations } from './exame-item-compartilhado.operations';

@Injectable()
export class ExameItemCompartilhadoService
  implements ExameItemCompartilhadoOperations
{
  constructor(
    @InjectRepository(ExameItemCompartilhado)
    private repository: Repository<ExameItemCompartilhado>,
  ) {}

  async criarExameItemCompartilhado(
    exameCompartilhado: ExameCompartilhado,
    exameItemComartilhadoRequest: ExameItemsMapResponseData,
  ) {
    const itensSalvos = [];
    const itensCompartilhados =
      ExameItemCompartilhadoAssembler.assembleExameItemCompartilhadoInsertToEntity(
        exameItemComartilhadoRequest,
      );

    itensCompartilhados.forEach(async (item) => {
      const exameItemCompartilhadoCriado = this.repository.create({
        exameCompartilhado,
        ...item,
      });
      itensSalvos.push(exameItemCompartilhadoCriado);

      const itemSalvo = await this.repository.save(
        exameItemCompartilhadoCriado,
      );
    });

    return ExameItemCompartilhadoAssembler.assembleItemCreationToResponseType(
      itensSalvos,
    );
  }
}
