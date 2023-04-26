import { ExameItemsMapResponseType } from '@modules/exame/type/exame-items-map.response.type';
import { ExameResponseDto } from 'src/types/dtos/exame.response.dto';
import { User } from 'src/types/entities/user.entity';
import { ExamesAndExameItemsResponseType } from './type/exame-and-exame-items.response.type';

export interface ExameOperations {
  getExames(): Promise<ExameResponseDto[]>;
  createExame(user: User, data: string): Promise<any>;
  getExameById(id: string): Promise<any>;
  getExamesByUserId(userId: string): Promise<ExamesAndExameItemsResponseType>;
  getExameItemsFromAllExamsByUser(
    userId: string,
  ): Promise<ExameItemsMapResponseType>;
  // updateExame(id: string, data: UpdateExameDto): Promise<any>;
  // deleteExame(id: string): Promise<boolean>;
}
