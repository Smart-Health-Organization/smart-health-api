import { Module } from "@nestjs/common";
import { Tokens } from "@utils/tokens";
import { PdfManipulatorController } from "./pdf-manipulator.controller";
import { PdfManipulatorService } from "./pdf-manipulator.service";


@Module({
  imports: [],
  controllers: [PdfManipulatorController],
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