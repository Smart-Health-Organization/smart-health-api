import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExameItemInsertDto } from 'src/types/dtos/exame-item.insert.dto';
import { ExameItem } from 'src/types/entities/exame-item.entity';
import { Repository } from 'typeorm';
import { Exame } from '../../types/entities/exame.entity';
import { ExameItemOperations } from './exame-item.operations';

@Injectable()
export class ExameItemService implements ExameItemOperations {
  constructor(
    @InjectRepository(ExameItem)
    private exameItemRepository: Repository<ExameItem>,
  ) {}
  async createExameItems(
    exame: Exame,
    exameItens: ExameItemInsertDto[],
  ): Promise<any> {
    const allExameItensSaved = [];
    for (const exameItem of exameItens) {
      const exameItemCreated = this.exameItemRepository.create({
        exame,
        metrica: exameItem.metrica,
        medida: exameItem.medida,
        unidade: exameItem.unidade,
      });
      const exameSaved = await this.exameItemRepository.save(exameItemCreated);
      allExameItensSaved.push(exameSaved);
    }
    return allExameItensSaved;
  }

  async getExameItemsByExameId(exameId: number): Promise<ExameItem[]> {
    const exameItems = await this.exameItemRepository.find({
      where: {
        exame: { id: exameId },
      },
    });

    return exameItems;
  }
}
