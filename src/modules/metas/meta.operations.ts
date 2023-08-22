import { CreateMetaInsertDto } from '@app/types/dtos/insert/create-meta.insert.dto';
import { MetaResponseDto } from '@app/types/dtos/response/meta.response.dto';
import { Usuario } from '@app/types/entities/usuario.entity';

export interface Operations {
  getMetasByUsuario(usuario: Usuario): MetaResponseDto[];

  createMetas(usuario: Usuario, meta: CreateMetaInsertDto): MetaResponseDto;
}
