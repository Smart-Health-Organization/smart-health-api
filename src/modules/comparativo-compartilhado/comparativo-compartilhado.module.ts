import { ComparativoCompartilhado } from '@app/types/entities/comparativo-compartilhado.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';
import { ComparativoCompartilhadoService } from './comparativo-compartilhado.service';

@Module({
  imports: [TypeOrmModule.forFeature([ComparativoCompartilhado])],
  controllers: [],
  providers: [
    ComparativoCompartilhadoService,
    {
      provide: Tokens.COMPARATIVO_COPMPARTILHADO_OPERATIONS,
      useClass: ComparativoCompartilhadoService,
    },
  ],
  exports: [
    {
      provide: Tokens.COMPARATIVO_COPMPARTILHADO_OPERATIONS,
      useClass: ComparativoCompartilhadoService,
    },
  ],
})
export class ComparativoCompartilhadoModule {}
