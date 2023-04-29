import { ExameAssembler } from '@modules/exame/assembler/exameAssembler';
import { ItemsDoExameResponseType } from '@modules/exame/type/exame-and-exame-items.response.type';
import {
  Controller,
  Get,
  Inject,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Tokens } from '@utils/tokens';
import { ExameOperations } from './exame.operations';

@ApiTags('Exames')
@Controller('exames')
export class ExameController {
  constructor(
    @Inject(Tokens.EXAME_OPERATIONS) private readonly service: ExameOperations,
  ) {}

  @Get('/pdf')
  @ApiOkResponse({
    description: 'Pdf Lido com sucesso e itens retornados ',
    type: ItemsDoExameResponseType,
  })
  @UseInterceptors(FileInterceptor('file'))
  async readExamesBasedOnMetricas(
    @UploadedFile() file,
  ): Promise<ItemsDoExameResponseType> {
    const exameObject = Object.fromEntries(
      await this.service.readExamesBasedOnMetricas(file),
    );
    let response =
      ExameAssembler.assemblePdfExameToInsertExameItems(exameObject);

    return response;
  }
}
