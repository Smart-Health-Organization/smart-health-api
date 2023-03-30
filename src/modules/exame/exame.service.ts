import { ExameItemOperations } from '@modules/exame copy/exame-item.operations';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';
import { ExameResponseDto } from 'src/types/dtos/exame.response.dto';
import { ExameItem } from 'src/types/entities/exame-item.entity';
import { User } from 'src/types/entities/user.entity';
import { Repository } from 'typeorm';
import { Exame } from '../../types/entities/exame.entity';
import { ExameAssembler } from './assembler/exameAssembler';
import { ExameOperations } from './exame.operations';
import { ExamesAndExameItemsResponseType } from './type/exame-and-exame-items.response.type';

@Injectable()
export class ExameService implements ExameOperations {
  constructor(
    @InjectRepository(Exame)
    private exameRepository: Repository<Exame>,
    @Inject(Tokens.EXAME_ITEM_OPERATIONS) private readonly exameItemservice: ExameItemOperations,

  ) {}
  async createExame(user: User): Promise<ExameResponseDto> {
    const exame = this.exameRepository.create({
      user,
      data: new Date().toString(),
    });
    const exameSaved = await this.exameRepository.save(exame);
    if (!exameSaved) {
      throw new InternalServerErrorException('Exame was not created');
    }
    const exameDto = ExameAssembler.assembleCreateExameToDto(exameSaved);
    return exameDto;
  }

  async getExames(): Promise<ExameResponseDto[]> {
    const exames = await this.exameRepository.find({ relations: ['user'] });
    const examesDto = ExameAssembler.assembleExamesToDto(exames);
    return examesDto;
  }

  async getExameById(id: string): Promise<Exame> {
    const exame = await this.exameRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!exame) {
      throw new NotFoundException('Exame not found');
    }
    return exame;
  }

  async getExamesByUserId(userId: string):Promise<ExamesAndExameItemsResponseType> {
    const exames = await this.exameRepository.find({
      where: {
        user: { id: parseInt(userId) },
      },
    });
     const exameItensMap = new Map<Exame,ExameItem[]>;
    for(const exame of exames){
      const exameItems = await this.exameItemservice.getExameItemsByExameId(exame.id)
      exameItensMap.set(exame,exameItems)
    }
    console.log(exameItensMap)
    return ExameAssembler.assembleExameAndExameItemsToDto(exameItensMap);
  }


  // async updateExame(id: string, data: UpdateExameDto): Promise<any> {
  //   const exame = await this.getExameById(id);
  //   await this.exameRepository.update(exame, { ...data });

  //   //cria-se esse objeto porque em update faltam propriedades do tipo exame
  //   const exameUpdated = this.exameRepository.create({ ...exame, ...data });
  //   return exameUpdated;
  // }

  // async deleteExame(id: string): Promise<boolean> {
  //   await this.getExameById(id);
  //   const deleted = await this.exameRepository.delete(id);
  //   if (deleted) return true;
  //   return false;
  // }
}