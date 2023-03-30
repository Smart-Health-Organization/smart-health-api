import { UserAssembler } from '@modules/user/assembler/userAssembler';
import { ExameResponseDto } from 'src/types/dtos/exame.response.dto';
import { Exame } from 'src/types/entities/exame.entity';

export class ExameAssembler {
  static assembleCreateExameToDto(exame: Exame): ExameResponseDto {
    return {
      id: exame.id,
      data: exame.data,
      itens: 'todo',
      user: UserAssembler.assembleUserToDto(exame.user),
    };
  }
  static assembleExamesToDto(exame: Exame[]): ExameResponseDto[] {
    const examesDto = exame.map((exame) => {
      return {
        id: exame.id,
        data: exame.data,
        itens: 'todo',
        user: { id: exame.user.id, name: exame.user.name },
      };
    });

    return examesDto;
  }
}
