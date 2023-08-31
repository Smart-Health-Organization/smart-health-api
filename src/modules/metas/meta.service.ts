import { CreateMetaInsertDto } from '@app/types/dtos/insert/create-meta.insert.dto';
import {
  GetMetasResponseDto,
  MetaResponseDto,
} from '@app/types/dtos/response/meta.response.dto';
import { Meta } from '@app/types/entities/meta.entity';
import { Usuario } from '@app/types/entities/usuario.entity';
import { MetaAssembler } from '@modules/metas/assembler/meta.assembler';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetaOperations } from './meta.operations';

@Injectable()
export class MetaService implements MetaOperations {
  constructor(
    @InjectRepository(Meta)
    private metaRepository: Repository<Meta>,
  ) {}

  async getMetasByUsuarioId(usuarioId: number): Promise<GetMetasResponseDto> {
    const metas = await this.metaRepository.find({
      where: { usuario: { id: usuarioId } },
    });

    if (!metas) {
      throw new NotFoundException('Usuário ainda não possui metas');
    }

    const metasDto = MetaAssembler.assembleMetasToResponse(metas);

    return metasDto;
  }
  async postMetas(
    usuario: Usuario,
    meta: CreateMetaInsertDto,
  ): Promise<MetaResponseDto> {
    const dataInicio = new Date(meta.dataInicio);

    const dataFim = new Date(meta.dataFim);

    const dataAtual = new Date();

    if (dataInicio > dataFim) {
      throw new BadRequestException(
        'A data de início não pode ser maior do que a data de fim.',
      );
    } else if (dataInicio < dataAtual || dataFim < dataAtual) {
      throw new BadRequestException('Não é possível criar datas no passado.');
    } else {
      const metaExistente = await this.metaRepository.find({
        where: {
          isConcluida: false,
        },
      });
      if (!metaExistente.length) {
        const metaSalva = await this.metaRepository.save({
          ...meta,
          usuario,
          dataInicio,
          dataFim,
          isConcluida: false,
        });

        if (!metaSalva) {
          throw new BadRequestException('Meta não foi criada');
        }

        const metaCriadaDto = MetaAssembler.assembleMetaToResponse(metaSalva);
        return metaCriadaDto;
      }
      throw new BadRequestException('Você ainda possui metas em aberto');
    }
  }

  async concluirMeta(
    usuarioId: number,
    metaId: number,
  ): Promise<MetaResponseDto> {
    const meta = await this.metaRepository.findOne({
      where: { id: metaId, usuario: { id: usuarioId } },
    });
    await this.metaRepository.update(metaId, { isConcluida: true });
    return MetaAssembler.assembleMetaToResponse({ ...meta, isConcluida: true });
  }

  async getMetaById(metaId: number): Promise<Meta> {
    const meta = await this.metaRepository.findOne({
      where: { id: metaId },
    });

    if (!meta) {
      throw new NotFoundException('Meta não encontrada');
    }
    return meta;
  }

  async deleteMeta(metaId: number): Promise<boolean> {
    await this.getMetaById(metaId);
    const deleted = await this.metaRepository.delete(metaId);
    if (deleted) return true;
    return false;
  }
}
