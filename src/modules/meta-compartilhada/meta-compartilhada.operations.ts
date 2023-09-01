import { ExameCompartilhado } from '@app/types/entities/exame-compartilhado.entity';
import { MetaCompartilhadaResponseType } from '@modules/meta-compartilhada/type/meta-compartilhada.response.type';

export interface MetaCompartilhadaOperations {
  getComparativosCompartilhadosByExameId(
    exameCompartilhadoId: number,
  ): Promise<MetaCompartilhadaResponseType>;

  createMetaCompartilhada(
    metaId: number,
    exameCompartilhado: ExameCompartilhado,
  ): Promise<any>;
}
