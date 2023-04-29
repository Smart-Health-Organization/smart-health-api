import { CreateExameItemInsertDto } from '@app/types/dtos/insert/exame-item.insert.dto';
import { Usuario } from '@app/types/entities/usuario.entity';
import { ExameItem } from 'src/types/entities/exame-item.entity';
import { Exame } from 'src/types/entities/exame.entity';

export interface ExameItemOperations {
  createExameItems(
    user: Usuario,
    exame: Exame,
    exameItens: CreateExameItemInsertDto[],
  ): Promise<any>;
  getExameItemsByExameId(exameId: number): Promise<ExameItem[]>;
}
