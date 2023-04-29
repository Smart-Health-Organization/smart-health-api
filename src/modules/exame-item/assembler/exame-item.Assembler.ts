import { ExameResponseDto } from '@app/types/dtos/response/exame.response.dto';
import { UsuarioAssembler } from '@modules/usuario/assembler/usuarioAssembler';
import { Exame } from 'src/types/entities/exame.entity';

export class ExameAssembler {
  static assembleCreateExameToDto(exame: Exame): ExameResponseDto {
    return {
      id: exame.id,
      data: exame.data,
      itens: 'todo',
      user: UsuarioAssembler.assembleUserToDto(exame.user),
    };
  }
  static assembleExamesToDto(exame: Exame[]): ExameResponseDto[] {
    const examesDto = exame.map((exame) => {
      return {
        id: exame.id,
        data: exame.data,
        itens: 'todo',
        user: { id: exame.user.id, nome: exame.user.nome },
      };
    });

    return examesDto;
  }
}
