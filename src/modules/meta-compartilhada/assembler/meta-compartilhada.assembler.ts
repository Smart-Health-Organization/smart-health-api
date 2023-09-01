import { ComparativoCompartilhadoInsertDto } from '@app/types/dtos/insert/comparativo-compartilhado-insert';
import { MetaCompartilhada } from '@app/types/entities/meta-compartilhada.entity';
import { Meta } from '@app/types/entities/meta.entity';
import { ComparativoCompartilhadoAssembler } from '@modules/comparativo-compartilhado/assembler/comparativo-compartilhado.assembler';
import { MetaCompartilhadaResponseType } from '@modules/meta-compartilhada/type/meta-compartilhada.response.type';
import { AntropometriaComparativoResponseData } from '@modules/metas/modules/antropometria/type/antropometria-comparativo.response.type';

export class MetaCompartilhadaAssembler {
  public static assembleMetaCompartilhadaEntityToResponseType(
    entidade: MetaCompartilhada,
  ): MetaCompartilhadaResponseType {
    const comparativos =
      ComparativoCompartilhadoAssembler.assembleComparativoCompartilhadoEntityToResponseType(
        entidade.comparativos,
      );

    return {
      id: entidade.id,
      gorduraCorporal: entidade.gorduraCorporal,
      massaMagra: entidade.massaMagra,
      comparativos: comparativos,
    };
  }

  public static assembleMetaCompartilhadaRequestToEntity(
    comparativos: AntropometriaComparativoResponseData,
    meta: Meta,
  ) {
    const comparativosFormatados = comparativos
      ? this.assembleComparativoCompartilhadoInsertToEntity(comparativos)
      : undefined;
    const { titulo, dataInicio, dataFim, massaMagra, gorduraCorporal } = meta;

    return {
      titulo,
      dataInicio,
      dataFim,
      massaMagra,
      gorduraCorporal,
      comparativos: comparativosFormatados,
    };
  }

  public static assembleComparativoCompartilhadoInsertToEntity(
    comparativos: AntropometriaComparativoResponseData,
  ) {
    const comparativosFormatados: ComparativoCompartilhadoInsertDto[] = [];
    Array.from(Object.keys(comparativos)).forEach((comparativo) => {
      comparativos[comparativo].forEach((item) => {
        comparativosFormatados.push({
          nome: comparativo,
          data: item.data,
          medida: item.medida,
        });
      });
    });
    return comparativosFormatados;
  }
}
