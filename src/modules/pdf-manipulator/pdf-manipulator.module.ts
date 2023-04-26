import { Module } from "@nestjs/common";
import { Tokens } from "@utils/tokens";
import { PdfManipulatorController } from "./pdf-manipulator.controller";
import { PdfManipulatorService } from "./pdf-manipulator.service";
import { MetricaModule } from "@modules/metrica/metrica.module";


@Module({
  imports: [MetricaModule],
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