import { ExameItemModule } from '@modules/exame-item/exame-item.module';
import { MetricaModule } from '@modules/metrica/metrica.module';
import { PdfManipulatorModule } from '@modules/pdf-manipulator/pdf-manipulator.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';
import { Exame } from 'src/types/entities/exame.entity';
import { ExameController } from './exame.controller';
import { ExameResolver } from './exame.resolver';
import { ExameService } from './exame.service';

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
    ExameResolver,
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
