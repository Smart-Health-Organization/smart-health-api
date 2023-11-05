import { ExameItemCompartilhado } from '@app/types/entities/exame-item-compartilhado.entity';
import { ExameItemCompartilhadoAssembler } from '@modules/exame-item-compartilhado/assembler/exame-item-compartilhado.assembler';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExameItemCompartilhadoOperations } from './exame-item-compartilhado.operations';

@Injectable()
export class ExameItemCompartilhadoService
  implements ExameItemCompartilhadoOperations
{
  constructor(
    @InjectRepository(ExameItemCompartilhado)
    private repository: Repository<ExameItemCompartilhado>,
  ) {}

  async getExameItensCompartilhadosByExameId(exameId: number): Promise<any> {
    const itens = await this.repository.find({
      where: {
        exameCompartilhado: {
          id: exameId,
        },
      },
    });

    if (!itens.length) {
      return null;
    }

    const itensResponse =
      ExameItemCompartilhadoAssembler.assembleItemEntityToResponseType(itens);

    return itensResponse;
  }
}
