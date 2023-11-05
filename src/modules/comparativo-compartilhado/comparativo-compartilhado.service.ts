import { ComparativoCompartilhado } from '@app/types/entities/comparativo-compartilhado.entity';
import { ComparativoCompartilhadoAssembler } from '@modules/comparativo-compartilhado/assembler/comparativo-compartilhado.assembler';
import { ComparativoCompartilhadoOperations } from '@modules/comparativo-compartilhado/comparativo-compartilhado.operations';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ComparativoCompartilhadoService
  implements ComparativoCompartilhadoOperations
{
  constructor(
    @InjectRepository(ComparativoCompartilhado)
    private repository: Repository<ComparativoCompartilhado>,
  ) {}
  async getComparativosCompartilhadosByExameId(
    metaCompartilhadaId: number,
  ): Promise<any> {
    const comparativosCompartilhados = await this.repository.find({
      where: {
        metaCompartilhada: {
          id: metaCompartilhadaId,
        },
      },
    });
    if (!comparativosCompartilhados.length) {
      return null;
    }
    return ComparativoCompartilhadoAssembler.assembleComparativoCompartilhadoEntityToResponseType(
      comparativosCompartilhados,
    );
  }
}
