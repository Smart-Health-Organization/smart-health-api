import { CreateMetaInsertDto } from '@app/types/dtos/insert/create-meta.insert.dto';
import {
  GetMetasResponseDto,
  MetaResponseDto,
} from '@app/types/dtos/response/meta.response.dto';
import { Usuario } from '@app/types/entities/usuario.entity';

export interface MetaOperations {
  getMetasByUsuarioId(usuarioId: number): Promise<GetMetasResponseDto>;

  postMetas(
    usuario: Usuario,
    meta: CreateMetaInsertDto,
  ): Promise<MetaResponseDto>;
}
