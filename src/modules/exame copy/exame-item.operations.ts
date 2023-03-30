import { ExameItemInsertDto } from 'src/types/dtos/exame-item.insert.dto';
import { ExameResponseDto } from 'src/types/dtos/exame.response.dto';
import { ExameItem } from 'src/types/entities/exame-item.entity';
import { Exame } from 'src/types/entities/exame.entity';
import { User } from 'src/types/entities/user.entity';

export interface ExameItemOperations {
  // getExames(): Promise<ExameResponseDto[]>;
  createExameItems(exame: Exame, exameItens: ExameItemInsertDto[]): Promise<any>;
  getExameItemsByExameId(exameId:number) : Promise<ExameItem[]>;
  // getExameById(id: string): Promise<any>;
  // getExamesByUserId(userId: string): Promise<any>;
  // updateExame(id: string, data: UpdateExameDto): Promise<any>;
  // deleteExame(id: string): Promise<boolean>;
}
