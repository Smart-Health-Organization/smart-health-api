import { UsuarioResponseDto } from '@app/types/dtos/response/user.response.dto';
import { Usuario } from '@app/types/entities/usuario.entity';

export class UsuarioAssembler {
  static assembleCreateUsuarioParaDto(user: Usuario): UsuarioResponseDto {
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      idade: user.idade,
      sexo: user.sexo,
    };
  }
  static assembleUsuariosParaDto(user: Usuario[]): UsuarioResponseDto[] {
    const usersDto = user.map((user) => {
      return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        idade: user.idade,
        sexo: user.sexo,
      };
    });

    return usersDto;
  }

  static assembleUserToDto(user: Usuario): UsuarioResponseDto {
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      idade: user.idade,
      sexo: user.sexo,
    };
  }
}
