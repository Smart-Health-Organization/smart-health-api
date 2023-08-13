import { ExameCompartilhadoInsertDto } from '@app/types/dtos/insert/exame-compartilhado.request.dto';
import { Usuario } from '@app/types/entities/usuario.entity';
import { Tokens } from '@app/utils/tokens';
import { ExameCompartilhadoAssembler } from '@modules/exame-compartilhado/assembler/exame-compartilhado.assembler';
import { ExameEItensCompartilhadoResponse } from '@modules/exame-compartilhado/type/exame-e-itens-compartilhados.response';
import { LoginRequest } from '@modules/exame-compartilhado/type/login.request';
import { ExameItemCompartilhadoOperations } from '@modules/exame-item-compartilhado/exame-item-compartilhado.operations';
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
      const exameCompartilhadoCreiado = this.repository.create({
        usuario,
        ...exameCompartilhado,
      });

      const exameSalvo = await this.repository.save(exameCompartilhadoCreiado);
      const itensResponse =
        await this.itemCompartilhadoService.criarExameItemCompartilhado(
          exameSalvo,
          exameComartilhadoRequest.itens,
        );

      return {
        titulo: exameSalvo.titulo,
        login: exameSalvo.login,
        itens: itensResponse,
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
      throw new UnauthorizedException('login ou senha incorretos');
    }

    const validPassword = compareSync(data.senha, exameCompartilhado.senha);

    if (!validPassword) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }

    const itens =
      await this.itemCompartilhadoService.getExameItensCompartilhadosByExameId(
        exameCompartilhado.id,
      );

    return {
      titulo: exameCompartilhado.titulo,
      usuario: UsuarioAssembler.assembleUsuarioToDto(
        exameCompartilhado.usuario,
      ),
      itens: itens,
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
