import { ExameItem } from '@app/types/entities/exame-item.entity';
import { ResultadoExameItem } from '@app/types/entities/resultado-exame.entity';
import { MetricaModule } from '@modules/metrica/metrica.module';
import { LimiteModule } from '@modules/metrica/modules/limite/limite.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';
import { ExameItemResolver } from './exame-item.resolver';
import { ExameItemService } from './exame-item.service';

@Module({
  imports: [
    MetricaModule,
    LimiteModule,
    TypeOrmModule.forFeature([ExameItem]),
    TypeOrmModule.forFeature([ResultadoExameItem]),
  ],
  controllers: [],
  providers: [
    ExameItemService,
    ExameItemResolver,
    {
      provide: Tokens.EXAME_ITEM_OPERATIONS,
      useClass: ExameItemService,
    },
  ],
  exports: [
    {
      provide: Tokens.EXAME_ITEM_OPERATIONS,
      useClass: ExameItemService,
    },
  ],
})
export class ExameItemModule {}
