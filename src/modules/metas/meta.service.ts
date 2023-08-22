import { CreateMetaInsertDto } from '@app/types/dtos/insert/create-meta.insert.dto';
import { MetaResponseDto } from '@app/types/dtos/response/meta.response.dto';
import { Usuario } from '@app/types/entities/usuario.entity';
import { Injectable } from '@nestjs/common';
import { Operations } from './meta.operations';

@Injectable()
export class MetaService implements Operations {
  getMetasByUsuario(usuario: Usuario): MetaResponseDto[] {
    throw new Error('Method not implemented.');
  }
  createMetas(usuario: Usuario, meta: CreateMetaInsertDto): MetaResponseDto {
    throw new Error('Method not implemented.');
  }
}
