import { ExameItemOperations } from '@modules/exame copy/exame-item.operations';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { Tokens } from '@utils/tokens';
import { ExameItemInsertDto, insertExameItems } from 'src/types/dtos/exame-item.insert.dto';
import { ExameOperations } from './exame.operations';

@Controller('exames')
export class ExameController {
  constructor(
    @Inject(Tokens.EXAME_OPERATIONS) private readonly service: ExameOperations,
    @Inject(Tokens.EXAME_ITEM_OPERATIONS) private readonly exameItemservice: ExameItemOperations,

  ) {}

  @Get()
  getExames() {
    return this.service.getExames();
  }

  @Post(':id/exame-itens')
  async createExameItens(@Param('id') id: string,
      @Body() data: insertExameItems,
): Promise<any[]> {
    const exame = await this.getExameById(id);
    const exameitens = await this.exameItemservice.createExameItems(exame,data.itens);
    return exameitens;
  }

  // @Patch('/:id')
  // async updateExame(
  //   @Body() data: UpdateExameDto,
  //   @Param('id') id: string,
  // ): Promise<Exame> {
  //   const exame = await this.service.updateExame(id, data);
  //   return exame;
  // }

  @Get('/:id')
  getExameById(@Param('id') id: string) {
    return this.service.getExameById(id);
  }

  // @Delete('/:id')
  // @HttpCode(204)
  // deleteExame(@Param('id') id: string) {
  //   return this.service.deleteExame(id);
  // }
}
