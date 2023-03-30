import { ExameOperations } from '@modules/exame/exame.operations';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';
import { clearConfigCache } from 'prettier';
import { ExameItemInsertDto } from 'src/types/dtos/exame-item.insert.dto';
import { ExameResponseDto } from 'src/types/dtos/exame.response.dto';
import { ExameItem } from 'src/types/entities/exame-item.entity';
import { User } from 'src/types/entities/user.entity';
import { Repository } from 'typeorm';
import { Exame } from '../../types/entities/exame.entity';
import { ExameAssembler } from './assembler/exame-item.Assembler';
import { ExameItemOperations } from './exame-item.operations';

@Injectable()
export class ExameItemService implements ExameItemOperations {
  constructor(
    @InjectRepository(ExameItem)
    private exameItemRepository: Repository<ExameItem>,
  ) {}
  async createExameItems(exame: Exame, exameItens: ExameItemInsertDto[]): Promise<any> {
    const allExameItensSaved  = []
     for(const exameItem of exameItens){
      const exameItemCreated = this.exameItemRepository.create({exame,metrica: exameItem.metrica,
        medida:exameItem.medida,
        unidade:exameItem.unidade,
      });
      const exameSaved =  await this.exameItemRepository.save(exameItemCreated)
      allExameItensSaved.push(exameSaved)
     }
  return allExameItensSaved
  }

  async getExameItemsByExameId(exameId:number): Promise<ExameItem[]>{
    const exameItems = await this.exameItemRepository.find({
      where: {
        exame: { id: exameId },
      },
    });

    return exameItems
  }
}
