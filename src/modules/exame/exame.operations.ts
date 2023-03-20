import { ExameResponseDto } from 'src/types/dtos/exame.response.dto';
import { User } from 'src/types/entities/user.entity';

export interface ExameOperations {
  getExames(): Promise<ExameResponseDto[]>;
  createExame(user: User): Promise<any>;
  getExameById(id: string): Promise<any>;
  getExamesByUserId(userId: string): Promise<any>;
  // updateExame(id: string, data: UpdateExameDto): Promise<any>;
  // deleteExame(id: string): Promise<boolean>;
}
