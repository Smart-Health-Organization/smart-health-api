import { ExameAssembler } from '@modules/exame/assembler/exameAssembler';
import { ItemsDoExameResponseType } from '@modules/exame/type/exame-and-exame-items.response.type';
import {
  Controller,
  Post,
  Inject,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Tokens } from '@utils/tokens';
import { ExameOperations } from './exame.operations';

@ApiBearerAuth()
@ApiTags('Exames')
@Controller('exames')
export class ExameController {
  constructor(
    @Inject(Tokens.EXAME_OPERATIONS) private readonly service: ExameOperations,
  ) {}

  @Post('/pdf')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
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
