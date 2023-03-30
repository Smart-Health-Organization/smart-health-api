import { ExameResponseDto } from 'src/types/dtos/exame.response.dto';
import { ExameItem } from 'src/types/entities/exame-item.entity';
import { Exame } from 'src/types/entities/exame.entity';
import { User } from 'src/types/entities/user.entity';
import { ExamesAndExameItemsResponseType } from './type/exame-and-exame-items.response.type';

export interface ExameOperations {
  getExames(): Promise<ExameResponseDto[]>;
  createExame(user: User): Promise<any>;
  getExameById(id: string): Promise<any>;
  getExamesByUserId(userId: string): Promise<ExamesAndExameItemsResponseType>;
  // updateExame(id: string, data: UpdateExameDto): Promise<any>;
  // deleteExame(id: string): Promise<boolean>;
}
