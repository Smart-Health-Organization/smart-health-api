import { CreateAntropometriaInsertDto } from '@app/types/dtos/insert/create-antropometria.insert.dto';
import { AntropometriaResponseDto } from '@app/types/dtos/response/antropometria.response.dto';
import { Meta } from '@app/types/entities/meta.entity';
import { AntropometriaComparativoResponseData } from '@modules/metas/modules/antropometria/type/antropometria-comparativo.response.type';

export interface AntropometriaOperations {
  createAntropometria(
    sexo: string,
    dataNascimento: string,
    meta: Meta,
    antropometria: CreateAntropometriaInsertDto,
  ): Promise<AntropometriaResponseDto>;

  getAntropometriasByMeta(metaId: number): Promise<AntropometriaResponseDto[]>;

  getComparativoDeMedidas(
    metaId: number,
  ): Promise<AntropometriaComparativoResponseData>;

  deleteAntropometria(
    antropometriaId: number,
    metaId: number,
  ): Promise<boolean>;
}
