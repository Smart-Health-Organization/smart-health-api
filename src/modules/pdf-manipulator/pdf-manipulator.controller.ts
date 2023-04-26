import { RemoveEmpty } from '@app/utils/remove-empry';
import { Tokens } from '@app/utils/tokens';
import { Controller, Inject, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Operations } from './pdf-manipulator.operations';
import { clearConfigCache } from 'prettier';

@Controller('pdf-manipulator')
export class PdfManipulatorController {
  constructor(
    @Inject(Tokens.PDF_OPERATIONS)
    private readonly service: Operations,
  ) {}

  @Post('/exames')
  @UseInterceptors(FileInterceptor('file'))
  async readExamesBasedOnMetricas(@UploadedFile() file) {
    const mapResponse = await this.service.readExamesBasedOnMetricas(file)
    return Object.fromEntries(mapResponse);;
  }
}
