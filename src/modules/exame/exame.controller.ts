import { InsertExameItems } from '@app/types/dtos/exame-item.insert.dto';
import { ExameItemOperations } from '@modules/exame-item/exame-item.operations';
import { ExameAssembler } from '@modules/exame/assembler/exameAssembler';
import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Tokens } from '@utils/tokens';
import { ExameOperations } from './exame.operations';

@ApiTags('Exames')
@Controller('exames')
export class ExameController {
  constructor(
    @Inject(Tokens.EXAME_OPERATIONS) private readonly service: ExameOperations,
    @Inject(Tokens.EXAME_ITEM_OPERATIONS)
    private readonly exameItemservice: ExameItemOperations,
  ) {}

  @Get()
  getExames() {
    return this.service.getExames();
  }

  @Post('/pdf')
  @UseInterceptors(FileInterceptor('file'))
  async readExamesBasedOnMetricas(
    @UploadedFile() file,
  ): Promise<Omit<InsertExameItems, 'data'>> {
    const exameObject = Object.fromEntries(
      await this.service.readExamesBasedOnMetricas(file),
    );
    let response =
      ExameAssembler.assemblePdfExameToInsertExameItems(exameObject);

    return response;
  }

  // @Post(':id/exame-itens')
  // async createExameItens(
  //   @Param('id') id: string,
  //   @Body() data: InsertExameItems,
  // ): Promise<any[]> {
  //   const exame = await this.getExameById(id);
  //   const exameitens = await this.exameItemservice.createExameItems(
  //     exame,
  //     data.itens,
  //   );
  //   return exameitens;
  // }

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
