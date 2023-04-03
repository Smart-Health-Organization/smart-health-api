import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExameService } from 'src/modules/exame/exame.service';
import { CreateExameDto } from 'src/types/dtos/create-exame.dto';
import { ExameResponseDto } from 'src/types/dtos/exame.response.dto';
import { Exame } from 'src/types/entities/exame.entity';
import { GqlAuthGuard } from '../../auth/auth.guard';
import { ExamesAndExameItemsResponseType } from './type/exame-and-exame-items.response.type';

@Resolver('Exame')
export class ExameResolver {
  constructor(private exameService: ExameService) {}

  @Query(() => [Exame])
  async exames(): Promise<ExameResponseDto[]> {
    const exames = await this.exameService.getExames();
    return exames;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Exame)
  async findExameById(@Args('id') id: string): Promise<Exame> {
    const exame = await this.exameService.getExameById(id);
    return exame;
  }

  @Mutation(() => Exame)
  async createExame(
    @Args('data') data: CreateExameDto,
  ): Promise<ExameResponseDto> {
    const exame = await this.exameService.createExame(data.user);
    return exame;
  }

  @Query(() => Exame)
  async findExamesByUserId(@Args('user') userId: string): Promise<ExamesAndExameItemsResponseType> {
    const exame = await this.exameService.getExamesByUserId(userId);
    return exame;
  }

  // @Mutation(() => Exame)
  // async updateExame(
  //   @Args('id') id: string,
  //   @Args('data') data: UpdateExameDto,
  // ): Promise<Exame> {
  //   const exame = await this.exameService.updateExame(id, data);
  //   return exame;
  // }

  // @Mutation(() => Boolean)
  // async deleteExame(@Args('id') id: string): Promise<boolean> {
  //   return await this.exameService.deleteExame(id);
  // }
}
