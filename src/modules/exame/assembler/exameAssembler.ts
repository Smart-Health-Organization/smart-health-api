import { InsertExameItems } from '@app/types/dtos/exame-item.insert.dto';
import { UserAssembler } from '@modules/user/assembler/userAssembler';
import { ExameResponseDto } from 'src/types/dtos/exame.response.dto';
import { ExameItem } from 'src/types/entities/exame-item.entity';
import { Exame } from 'src/types/entities/exame.entity';
import { ExamesAndExameItemsResponseType } from '../type/exame-and-exame-items.response.type';

export class ExameAssembler {
  static assembleCreateExameToDto(exame: Exame): ExameResponseDto {
    return {
      id: exame.id,
      data: exame.data,
      user: UserAssembler.assembleUserToDto(exame.user),
    };
  }
  static assembleExamesToDto(exame: Exame[]): ExameResponseDto[] {
    const examesDto = exame.map((exame) => {
      return {
        id: exame.id,
        data: exame.data,
        user: { id: exame.user.id, name: exame.user.name },
      };
    });

    return examesDto;
  }

  static assembleExameAndExameItemsToDto(
    exameAndExameItemMap: Map<Exame, ExameItem[]>,
  ): ExamesAndExameItemsResponseType {
    const exames = Array.from(exameAndExameItemMap.keys());
    const allExamesWithItems = exames.map((exame) => {
      const exameItens = exameAndExameItemMap.get(exame).map((item) => {
        return {
          id: item.id,
          metrica: item.metrica,
          medida: item.medida,
          unidade: item.unidade,
          resultado: item.resultado,
        };
      });

      return {
        id: exame.id,
        data: exame.data,
        itens: exameItens,
      };
    });

    return allExamesWithItems;
  }

  static assemblePdfExameToInsertExameItems(
    itens: object,
  ): Omit<InsertExameItems, 'data'> {
    const response = [];
    for (let metrica in itens) {
      response.push({
        metrica: metrica,
        medida: itens[metrica].valor,
        unidade: itens[metrica].unidade,
      });
    }

    return { itens: response };
  }
}
