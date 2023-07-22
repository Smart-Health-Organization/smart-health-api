import { ExameCompartilhado } from '@app/types/entities/exame-compartilhado.entity';
import { ExameItemCompartilhado } from '@app/types/entities/exame-item-compartilhado.entity';
import { ExameItemCompartilhadoService } from '@modules/exame-item-compartilhado/exame-item-compartilhado.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';
import { ExameCompartilhadoController } from './exame-compartilhado.controller';
import { ExameCompartilhadoService } from './exame-compartilhado.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExameItemCompartilhado]),
    TypeOrmModule.forFeature([ExameCompartilhado]),
  ],
  controllers: [ExameCompartilhadoController],
  providers: [
    ExameCompartilhadoService,
    {
      provide: Tokens.EXAME_COMPARTILHADO_OPERATIONS,
      useClass: ExameCompartilhadoService,
    },
    {
      provide: Tokens.EXAME_ITEM_COMPARTILHADO_OPERATIONS,
      useClass: ExameItemCompartilhadoService,
    },
  ],
  exports: [
    {
      provide: Tokens.EXAME_COMPARTILHADO_OPERATIONS,
      useClass: ExameCompartilhadoService,
    },
  ],
})
export class ExameCompartilhadoModule {}
