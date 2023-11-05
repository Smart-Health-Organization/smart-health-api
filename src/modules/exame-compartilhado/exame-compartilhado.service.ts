import { ExameCompartilhadoInsertDto } from '@app/types/dtos/insert/exame-compartilhado.request.dto';
import { Usuario } from '@app/types/entities/usuario.entity';
import { Tokens } from '@app/utils/tokens';

import { ExameCompartilhadoAssembler } from '@modules/exame-compartilhado/assembler/exame-compartilhado.assembler';
import { ExameEItensCompartilhadoResponse } from '@modules/exame-compartilhado/type/exame-e-itens-compartilhados.response';
import { LoginRequest } from '@modules/exame-compartilhado/type/login.request';
import { ExameItemCompartilhadoOperations } from '@modules/exame-item-compartilhado/exame-item-compartilhado.operations';
import { MetaCompartilhadaOperations } from '@modules/meta-compartilhada/meta-compartilhada.operations';
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { ExameCompartilhado } from './../../types/entities/exame-compartilhado.entity';
import { UsuarioAssembler } from './../usuario/assembler/usuarioAssembler';
import { ExameCompartilhadoOperations } from './exame-compartilhado.operations';

@Injectable()
export class ExameCompartilhadoService implements ExameCompartilhadoOperations {
  constructor(
    @InjectRepository(ExameCompartilhado)
    private repository: Repository<ExameCompartilhado>,
    @Inject(Tokens.EXAME_ITEM_COMPARTILHADO_OPERATIONS)
    private readonly itemCompartilhadoService: ExameItemCompartilhadoOperations,
    @Inject(Tokens.META_COMPARTILHADA_OPERATIONS)
    private readonly metaCompartilhadaService: MetaCompartilhadaOperations,
  ) {}

  async criarExameCompartilhado(
    usuario: Usuario,
    exameComartilhadoRequest: ExameCompartilhadoInsertDto,
  ) {
    const { senha, confirmacaoSenha } = exameComartilhadoRequest;
    if (senha === confirmacaoSenha) {
      const exameCompartilhado =
        ExameCompartilhadoAssembler.assembleExameCompartilhadorequestToEntity(
          exameComartilhadoRequest,
        );

      const exameSalvo = await this.repository.save({
        usuario,
        ...exameCompartilhado,
      });

      if (exameComartilhadoRequest.metaId) {
        await this.metaCompartilhadaService.createMetaCompartilhada(
          exameComartilhadoRequest.metaId,
          exameSalvo,
        );
      }

      return {
        titulo: exameSalvo.titulo,
        login: exameSalvo.login,
      };
    }
    throw new BadRequestException(
      'Senha inválida! Não foi possível criar exame compartilhado.',
    );
  }

  async getExamesCompartilhadosPorUsuario(id: string) {
    const examesCompartilhados = await this.repository.find({
      where: {
        usuario: { id: +id },
      },
    });

    return ExameCompartilhadoAssembler.assembleExameCompartilhadoInfo(
      examesCompartilhados,
    );
  }

  async getExameCompartilhadoByLogin(login: string): Promise<boolean> {
    const exameCompartilhado = await this.repository.findOne({
      where: {
        login: login,
      },
    });

    return exameCompartilhado ? true : false;
  }

  async getExameCompartilhadoByLoginAndSenha(
    data: LoginRequest,
  ): Promise<ExameEItensCompartilhadoResponse> {
    const exameCompartilhado = await this.repository.findOne({
      relations: ['usuario'],
      where: {
        login: data.login,
      },
    });

    if (!exameCompartilhado) {
      throw new UnauthorizedException('Login ou senha incorretos');
    }

    const validPassword = compareSync(data.senha, exameCompartilhado.senha);

    if (!validPassword) {
      throw new UnauthorizedException('Login ou senha incorretos');
    }

    const itens =
      await this.itemCompartilhadoService.getExameItensCompartilhadosByExameId(
        exameCompartilhado.id,
      );

    const metaCompartilhada =
      await this.metaCompartilhadaService.getComparativosCompartilhadosByExameId(
        exameCompartilhado.id,
      );

    return {
      titulo: exameCompartilhado.titulo,
      usuario: UsuarioAssembler.assembleUsuarioToDto(
        exameCompartilhado.usuario,
      ),
      itens: itens || undefined,
      meta: metaCompartilhada || undefined,
    };
  }

  async deleteExamesCompartilhado(
    usuario: Usuario,
    exameCompartilhadoId: string,
  ): Promise<boolean> {
    const deleted = await this.repository.delete({
      id: +exameCompartilhadoId,
      usuario: usuario,
    });

    if (deleted) return true;

    throw new BadRequestException('Exame Compartilhado não pode ser deletado');
  }
}
