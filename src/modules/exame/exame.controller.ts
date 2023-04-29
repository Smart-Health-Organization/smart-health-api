import { CreateExameItems } from '@app/types/dtos/insert/exame-item.insert.dto';
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
  ): Promise<Omit<CreateExameItems, 'data'>> {
    const exameObject = Object.fromEntries(
      await this.service.readExamesBasedOnMetricas(file),
    );
    let response =
      ExameAssembler.assemblePdfExameToInsertExameItems(exameObject);

    return response;
  }

  @Get('/:id')
  getExameById(@Param('id') id: string) {
    return this.service.getExameById(id);
  }
}
