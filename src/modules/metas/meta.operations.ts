import { CreateMetaInsertDto } from '@app/types/dtos/insert/create-meta.insert.dto';
import {
  GetMetasResponseDto,
  MetaResponseDto,
} from '@app/types/dtos/response/meta.response.dto';
import { Meta } from '@app/types/entities/meta.entity';
import { Usuario } from '@app/types/entities/usuario.entity';

export interface MetaOperations {
  getMetasByUsuarioId(usuarioId: number): Promise<GetMetasResponseDto>;

  getMetasById(metaId: number): Promise<Meta>;

  postMetas(
    usuario: Usuario,
    meta: CreateMetaInsertDto,
  ): Promise<MetaResponseDto>;

  concluirMeta(usuarioId: number, metaId: number): Promise<MetaResponseDto>;
  deleteMeta(metaId: number): Promise<boolean>;
}
