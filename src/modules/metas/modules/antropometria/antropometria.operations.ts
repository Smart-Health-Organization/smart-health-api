import { CreateAntropometriaInsertDto } from '@app/types/dtos/insert/create-antropometria.insert.dto';
import { AntropometriaResponseDto } from '@app/types/dtos/response/antropometria.response.dto';
import { Meta } from '@app/types/entities/meta.entity';

export interface AntropometriaOperations {
  createAntropometria(
    sexo: string,
    dataNascimento: string,
    meta: Meta,
    antropometria: CreateAntropometriaInsertDto,
  ): Promise<AntropometriaResponseDto>;

  getAntropometriasByMeta(metaId: number): Promise<AntropometriaResponseDto[]>;
}
