import { ExameItemCompartilhado } from '@app/types/entities/exame-item-compartilhado.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';
import { ExameItemCompartilhadoService } from './exame-item-compartilhado.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExameItemCompartilhado])],
  controllers: [],
  providers: [
    ExameItemCompartilhadoService,
    {
      provide: Tokens.EXAME_ITEM_COMPARTILHADO_OPERATIONS,
      useClass: ExameItemCompartilhadoService,
    },
  ],
  exports: [
    {
      provide: Tokens.EXAME_ITEM_COMPARTILHADO_OPERATIONS,
      useClass: ExameItemCompartilhadoService,
    },
  ],
})
export class ExameItemCompartilhadoModule {}
