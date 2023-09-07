import { ExameAssembler } from '@modules/exame/assembler/exame-assembler';
import { ItemsDoExameResponseType } from '@modules/exame/type/exame-and-exame-items.response.type';
import { pdfFilter } from '@modules/exame/validator/FileValidation';
import {
  BadRequestException,
  Controller,
  Inject,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: pdfFilter,
    }),
  )
  async readExamesBasedOnMetricas(
    @Req() req,
    @UploadedFile()
    file,
  ): Promise<ItemsDoExameResponseType> {
    if (!file || req.fileValidationError) {
      throw new BadRequestException(
        `Formato de arquivo inválido, ${req.fileValidationError}`,
      );
    }
    const exameObject = Object.fromEntries(
      await this.service.readExamesBasedOnMetricas(file),
    );
    let response =
      ExameAssembler.assemblePdfExameToInsertExameItems(exameObject);

    return response;
  }
}
