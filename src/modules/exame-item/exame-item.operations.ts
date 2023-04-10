import { User } from '@app/types/entities/user.entity';
import { ExameItemInsertDto } from 'src/types/dtos/exame-item.insert.dto';
import { ExameItem } from 'src/types/entities/exame-item.entity';
import { Exame } from 'src/types/entities/exame.entity';

export interface ExameItemOperations {
  // getExames(): Promise<ExameResponseDto[]>;
  createExameItems(
    user: User,
    exame: Exame,
    exameItens: ExameItemInsertDto[],
  ): Promise<any>;
  getExameItemsByExameId(exameId: number): Promise<ExameItem[]>;
  // getExameById(id: string): Promise<any>;
  // getExamesByUserId(userId: string): Promise<any>;
  // updateExame(id: string, data: UpdateExameDto): Promise<any>;
  // deleteExame(id: string): Promise<boolean>;
}
