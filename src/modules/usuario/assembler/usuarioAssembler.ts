import { UsuarioResponseDto } from '@app/types/dtos/response/usuario.response.dto';
import { Usuario } from '@app/types/entities/usuario.entity';

export class UsuarioAssembler {
  static assembleCreateUsuarioParaDto(user: Usuario): UsuarioResponseDto {
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      dataDeNascimento: (new Date(user.dataDeNascimento)).toISOString(),
      sexo: user.sexo,
    };
  }
  static assembleUsuariosParaDto(user: Usuario[]): UsuarioResponseDto[] {
    const usersDto = user.map((user) => {
      return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        dataDeNascimento: user.dataDeNascimento,
        sexo: user.sexo,
      };
    });

    return usersDto;
  }

  static assembleUsuarioToDto(user: Usuario): UsuarioResponseDto {
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      dataDeNascimento: user.dataDeNascimento,
      sexo: user.sexo,
    };
  }
}
