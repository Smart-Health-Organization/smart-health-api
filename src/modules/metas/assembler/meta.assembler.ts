import {
  GetMetasResponseDto,
  MetaResponseDto,
} from '@app/types/dtos/response/meta.response.dto';
import { Meta } from '@app/types/entities/meta.entity';
import { AntropometriaAssembler } from '@modules/metas/modules/antropometria/assembler/antropometria.assembler';

export class MetaAssembler {
  public static assembleMetasToResponse(metas: Meta[]): GetMetasResponseDto {
    return metas.map((meta) => this.assembleMetaToResponse(meta));
  }

  public static assembleMetaToResponse(meta: Meta): MetaResponseDto {
    const {
      id,
      titulo,
      dataInicio,
      dataFim,
      massaMagra,
      gorduraCorporal,
      antropometrias,
      isConcluida,
    } = meta;

    const antropometriasFormatadas =
      AntropometriaAssembler.assembleAntropometriasToResponse(antropometrias);
    return {
      id,
      titulo,
      dataInicio,
      dataFim,
      massaMagra,
      gorduraCorporal,
      isConcluida,
      antropometrias: antropometriasFormatadas,
    };
  }
}
