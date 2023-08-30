import {
  GetMetasResponseDto,
  MetaResponseDto,
} from '@app/types/dtos/response/meta.response.dto';
import { Meta } from '@app/types/entities/meta.entity';

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
    return {
      id,
      titulo,
      dataInicio,
      dataFim,
      massaMagra,
      gorduraCorporal,
      isConcluida,
      antropometrias,
    };
  }
}
