import { CreateUsuarioInsertDto } from '@app/types/dtos/insert/create-usuario.insert.dto';
import { RedefinirSenhaInsertDto } from '@app/types/dtos/insert/redefinir-senha.insert.dto';
import { UpdateUsuarioInsertDto } from '@app/types/dtos/insert/update-usuario.insert.dto';
import { UsuarioResponseDto } from '@app/types/dtos/response/usuario.response.dto';
import { UsuarioOperations } from '@modules/usuario/usuario.operations';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { Usuario } from '../../types/entities/usuario.entity';
import { UsuarioAssembler } from './assembler/usuarioAssembler';
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(
  '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',
);

@Injectable()
export class UsuarioService implements UsuarioOperations {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async postUsuario(data: CreateUsuarioInsertDto): Promise<UsuarioResponseDto> {
    const usuarioAlredyExist = await this.getUsuarioByEmail(data.email);
    if (usuarioAlredyExist) {
      throw new BadRequestException('Já existe um usuário com este email');
    }

    const dateParts = data.dataDeNascimento.split('/');
    const year = parseInt(dateParts[2], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[0], 10);
    const formattedFata = new Date(year, month, day);
    data.dataDeNascimento = formattedFata.toString();
    const usuario = this.usuarioRepository.create(data);
    const usuarioSaved = await this.usuarioRepository.save(usuario);
    if (!usuarioSaved) {
      throw new BadRequestException('Usuário não foi criado');
    }
    const usuarioDto =
      UsuarioAssembler.assembleCreateUsuarioParaDto(usuarioSaved);
    return usuarioDto;
  }

  async getUsuarios(): Promise<UsuarioResponseDto[]> {
    const usuarios = await this.usuarioRepository.find();
    const usuariosDto = UsuarioAssembler.assembleUsuariosParaDto(usuarios);
    return usuariosDto;
  }

  async getUsuarioByEmail(email: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { email },
    });
    return usuario;
  }

  async getUsuarioById(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return usuario;
  }

  async updateUsuario(
    id: string,
    data: UpdateUsuarioInsertDto,
  ): Promise<UsuarioResponseDto> {
    if (!Object.keys(data).length) {
      throw new BadRequestException(
        'É preciso alterar ao menos um campo para atualizar o usuário',
      );
    }
    const usuario = await this.getUsuarioById(id);
    if (data?.email) {
      const usuarioAlredyExist = await this.getUsuarioByEmail(data.email);
      if (usuarioAlredyExist) {
        throw new BadRequestException('Já existe um usuário com este email');
      }
    }
    await this.usuarioRepository.update(usuario.id, { ...data });

    //cria-se esse objeto porque em update faltam propriedades do tipo usuario
    const usuarioUpdated = await this.usuarioRepository.findOne({
      where: { id: usuario.id },
    });
    return UsuarioAssembler.assembleCreateUsuarioParaDto(usuarioUpdated);
  }

  async updateSenhaUsuario(
    id: string,
    data: RedefinirSenhaInsertDto,
  ): Promise<UsuarioResponseDto> {
    const usuario = await this.getUsuarioById(id);
    const validPassword = compareSync(data.senhaAntiga, usuario.senha);

    if (!validPassword) {
      throw new UnauthorizedException('Senha incorreta');
    }
    await this.usuarioRepository.update(id, { senha: data.NovaSenha });

    const usuarioUpdated = await this.getUsuarioById(id);
    return UsuarioAssembler.assembleCreateUsuarioParaDto(usuarioUpdated);
  }

  async deleteUsuario(id: string): Promise<boolean> {
    await this.getUsuarioById(id);
    const deleted = await this.usuarioRepository.delete(id);
    if (deleted) return true;
    return false;
  }
}
