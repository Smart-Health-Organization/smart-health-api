import { CreateExameItemInsertDtoArray } from '@app/types/dtos/insert/exame-item.insert.dto';
import { Usuario } from '@app/types/entities/usuario.entity';
import { ExameItem } from 'src/types/entities/exame-item.entity';
import { Exame } from 'src/types/entities/exame.entity';

export interface ExameItemOperations {
  createExameItems(
    usuario: Usuario,
    exame: Exame,
    exameItens: CreateExameItemInsertDtoArray,
  ): Promise<any>;
  getExameItemsByExameId(exameId: number): Promise<ExameItem[]>;
  verifyDuplicateMetrics(items: CreateExameItemInsertDtoArray);
}
