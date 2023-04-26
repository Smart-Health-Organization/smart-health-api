import { Module } from '@nestjs/common';
import { Tokens } from '@utils/tokens';
import { PdfManipulatorService } from './pdf-manipulator.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PdfManipulatorService,
    {
      provide: Tokens.PDF_OPERATIONS,
      useClass: PdfManipulatorService,
    },
  ],
  exports: [
    {
      provide: Tokens.PDF_OPERATIONS,
      useClass: PdfManipulatorService,
    },
  ],
})
export class PdfManipulatorModule {}
