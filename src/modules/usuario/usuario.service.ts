import { CreateUsuarioInsertDto } from '@app/types/dtos/insert/create-user.insert.dto';
import { ExameCompartilhadoInsertDto } from '@app/types/dtos/insert/exame-compartilhado.request.dto';
import { RedefinirSenhaInsertDto } from '@app/types/dtos/insert/redefinir-senha.insert.dto';
import { UpdateUsuarioInsertDto } from '@app/types/dtos/insert/update-usuario.insert.dto';
import { UsuarioResponseDto } from '@app/types/dtos/response/user.response.dto';
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
    private userRepository: Repository<Usuario>,
  ) {}

  createExameCompartilhado(
    id: string,
    data: ExameCompartilhadoInsertDto,
  ): Promise<any> {
    console.log(id, data);
    throw new Error('Method not implemented.');
  }

  async postUsuario(data: CreateUsuarioInsertDto): Promise<UsuarioResponseDto> {
    const userAlredyExist = await this.getUsuarioByEmail(data.email);
    if (userAlredyExist) {
      throw new BadRequestException('Já existe um usuário com este email');
    }
    const user = this.userRepository.create(data);
    const userSaved = await this.userRepository.save(user);
    if (!userSaved) {
      throw new BadRequestException('Usuário não foi criado');
    }
    const userDto = UsuarioAssembler.assembleCreateUsuarioParaDto(userSaved);
    return userDto;
  }

  async getUsuarios(): Promise<UsuarioResponseDto[]> {
    const users = await this.userRepository.find();
    const usersDto = UsuarioAssembler.assembleUsuariosParaDto(users);
    return usersDto;
  }

  async getUsuarioByEmail(email: string): Promise<Usuario> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }

  async getUsuarioById(id: string): Promise<Usuario> {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
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
    const user = await this.getUsuarioById(id);
    if (data?.email) {
      const userAlredyExist = await this.getUsuarioByEmail(data.email);
      if (userAlredyExist) {
        throw new BadRequestException('Já existe um usuário com este email');
      }
    }
    await this.userRepository.update(user.id, { ...data });

    //cria-se esse objeto porque em update faltam propriedades do tipo user
    const userUpdated = await this.userRepository.findOne({
      where: { id: user.id },
    });
    return UsuarioAssembler.assembleCreateUsuarioParaDto(userUpdated);
  }

  async updateSenhaUsuario(
    id: string,
    data: RedefinirSenhaInsertDto,
  ): Promise<UsuarioResponseDto> {
    const user = await this.getUsuarioById(id);
    const validPassword = compareSync(data.senhaAntiga, user.senha);

    if (!validPassword) {
      throw new UnauthorizedException('Senha incorreta');
    }
    await this.userRepository.update(id, { senha: data.NovaSenha });

    const userUpdated = await this.getUsuarioById(id);
    return UsuarioAssembler.assembleCreateUsuarioParaDto(userUpdated);
  }

  async deleteUsuario(id: string): Promise<boolean> {
    await this.getUsuarioById(id);
    const deleted = await this.userRepository.delete(id);
    if (deleted) return true;
    return false;
  }

  async getExamesCompartilhadosPorUsuario(id: string): Promise<any> {
    const user = await this.userRepository.findOne({
      relations: ['exame_compartilhado'],
      where: {
        id: parseInt(id),
      },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user.examesCompartilhados;
  }
}
