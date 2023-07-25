import { ExameCompartilhadoInsertDto } from '@app/types/dtos/insert/exame-compartilhado.request.dto';
import { ExameCompartilhado } from '@app/types/entities/exame-compartilhado.entity';
import { Usuario } from '@app/types/entities/usuario.entity';
import { Tokens } from '@app/utils/tokens';
import { ExameCompartilhadoAssembler } from '@modules/exame-compartilhado/assembler/exame-compartilhado.assembler';
import { ExameItemCompartilhadoOperations } from '@modules/exame-item-compartilhado/exame-item-compartilhado.operations';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
        usuario: { id: parseInt(id) },
      },
    });

    return examesCompartilhados;
  }
}
