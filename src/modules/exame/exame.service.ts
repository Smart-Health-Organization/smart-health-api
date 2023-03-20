import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExameResponseDto } from 'src/types/dtos/exame.response.dto';
import { User } from 'src/types/entities/user.entity';
import { Repository } from 'typeorm';
import { Exame } from '../../types/entities/exame.entity';
import { ExameAssembler } from './assembler/exameAssembler';
import { ExameOperations } from './exame.operations';

@Injectable()
export class ExameService implements ExameOperations {
  constructor(
    @InjectRepository(Exame)
    private exameRepository: Repository<Exame>,
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

  async getExamesByUserId(userId: string): Promise<Exame[]> {
    const exames = await this.exameRepository.find({
      where: {
        user: { id: parseInt(userId) },
      },
    });
    return exames;
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
