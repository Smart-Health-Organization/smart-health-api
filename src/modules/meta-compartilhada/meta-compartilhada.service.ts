import { ExameCompartilhado } from '@app/types/entities/exame-compartilhado.entity';
import { MetaCompartilhada } from '@app/types/entities/meta-compartilhada.entity';
import { Tokens } from '@app/utils/tokens';
import { MetaCompartilhadaAssembler } from '@modules/meta-compartilhada/assembler/meta-compartilhada.assembler';
import { MetaCompartilhadaOperations } from '@modules/meta-compartilhada/meta-compartilhada.operations';
import { MetaCompartilhadaResponseType } from '@modules/meta-compartilhada/type/meta-compartilhada.response.type';
import { MetaOperations } from '@modules/metas/meta.operations';
import { AntropometriaOperations } from '@modules/metas/modules/antropometria/antropometria.operations';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MetaCompartilhadaService implements MetaCompartilhadaOperations {
  constructor(
    @InjectRepository(MetaCompartilhada)
    private repository: Repository<MetaCompartilhada>,
    @Inject(Tokens.META_OPERATIONS)
    private readonly metaService: MetaOperations,
    @Inject(Tokens.ANTROPOMETRIA_OPERATIONS)
    private readonly antropometriaService: AntropometriaOperations,
  ) {}
  async getComparativosCompartilhadosByExameId(
    exameCompartilhadoId: number,
  ): Promise<MetaCompartilhadaResponseType> {
    const metaCompartilhada = await this.repository.findOne({
      relations: ['comparativos'],
      where: {
        exameCompartilhado: {
          id: exameCompartilhadoId,
        },
      },
    });
    if (!metaCompartilhada) {
      return null;
    }
    return MetaCompartilhadaAssembler.assembleMetaCompartilhadaEntityToResponseType(
      metaCompartilhada,
    );
  }

  async createMetaCompartilhada(
    metaId: number,
    exameCompartilhado: ExameCompartilhado,
  ): Promise<any> {
    const meta = await this.metaService.getMetasById(metaId);

    const comparativos =
      await this.antropometriaService.getComparativoDeMedidas(metaId);

    const metaFormatada =
      MetaCompartilhadaAssembler.assembleMetaCompartilhadaRequestToEntity(
        comparativos,
        meta,
      );

    const metaSalva = this.repository.save({
      exameCompartilhado,
      ...metaFormatada,
    });

    return metaSalva;
  }
}
