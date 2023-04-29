import { ExameResponseDto } from '@app/types/dtos/response/exame.response.dto';
import { Usuario } from '@app/types/entities/usuario.entity';
import { ExameItemsMapResponseType } from '@modules/exame/type/exame-items-map.response.type';
import { ExamesAndExameItemsResponseType } from './type/exame-and-exame-items.response.type';

export interface ExameOperations {
  getExames(): Promise<ExameResponseDto[]>;
  createExame(user: Usuario, data: string): Promise<any>;
  getExameById(id: string): Promise<any>;
  getExamesByUserId(userId: string): Promise<ExamesAndExameItemsResponseType>;
  getExameItemsFromAllExamsByUser(
    userId: string,
  ): Promise<ExameItemsMapResponseType>;
  readExamesBasedOnMetricas(file: any): Promise<any>;
}
