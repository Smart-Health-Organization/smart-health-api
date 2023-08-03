import { CreateUsuarioInsertDto } from '@app/types/dtos/insert/create-user.insert.dto';
import { RedefinirSenhaInsertDto } from '@app/types/dtos/insert/redefinir-senha.insert.dto';
import { UpdateUsuarioInsertDto } from '@app/types/dtos/insert/update-usuario.insert.dto';
import { UsuarioResponseDto } from '@app/types/dtos/response/user.response.dto';
import { Usuario } from '@app/types/entities/usuario.entity';

export interface UsuarioOperations {
  getUsuarios(): Promise<UsuarioResponseDto[]>;
  postUsuario(data: CreateUsuarioInsertDto): Promise<UsuarioResponseDto>;
  getUsuarioById(id: string): Promise<Usuario>;
  getUsuarioByEmail(email: string): Promise<UsuarioResponseDto>;
  updateUsuario(
    id: string,
    data: UpdateUsuarioInsertDto,
  ): Promise<UsuarioResponseDto>;
  updateSenhaUsuario(
    id: string,
    data: RedefinirSenhaInsertDto,
  ): Promise<UsuarioResponseDto>;
  deleteUsuario(id: string): Promise<boolean>;

  getExamesCompartilhadosPorUsuario(id: string): Promise<any>;
}
