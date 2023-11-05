import { Exame } from '@app/types/entities/exame.entity';
import { ExameItemModule } from '@modules/exame-item/exame-item.module';
import { ExameController } from '@modules/exame/exame.controller';
import { ExameService } from '@modules/exame/exame.service';
import { MetricaModule } from '@modules/metrica/metrica.module';
import { PdfManipulatorModule } from '@modules/pdf-manipulator/pdf-manipulator.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';

@Module({
  imports: [
    PdfManipulatorModule,
    MetricaModule,
    ExameItemModule,
    TypeOrmModule.forFeature([Exame]),
  ],
  controllers: [ExameController],
  providers: [
    ExameService,
    {
      provide: Tokens.EXAME_OPERATIONS,
      useClass: ExameService,
    },
  ],
  exports: [
    {
      provide: Tokens.EXAME_OPERATIONS,
      useClass: ExameService,
    },
  ],
})
export class ExameModule {}
