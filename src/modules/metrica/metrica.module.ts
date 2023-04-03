import { Metrica } from '@app/types/entities/metrica.entity';
import { MetricaResolver } from '@modules/metrica/metrica.resolver';
import { MetricaService } from '@modules/metrica/metrica.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';
import { MetricaController } from './metrica.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Metrica])],
  controllers: [MetricaController],
  providers: [
    MetricaService,
    MetricaResolver,
    {
      provide: Tokens.METRICA_OPERATIONS,
      useClass: MetricaService,
    },
  ],
  exports: [
    {
      provide: Tokens.METRICA_OPERATIONS,
      useClass: MetricaService,
    },
  ],
})
export class MetricaModule {}
