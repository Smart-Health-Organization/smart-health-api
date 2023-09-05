import { MetaCompartilhada } from '@app/types/entities/meta-compartilhada.entity';
import { MetaModule } from '@modules/metas/meta.module';
import { AntropometriaModule } from '@modules/metas/modules/antropometria/antropometria.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';
import { MetaCompartilhadaService } from './meta-compartilhada.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MetaCompartilhada]),
    MetaModule,
    AntropometriaModule,
  ],
  controllers: [],
  providers: [
    MetaCompartilhadaService,
    {
      provide: Tokens.META_COMPARTILHADA_OPERATIONS,
      useClass: MetaCompartilhadaService,
    },
  ],
  exports: [
    {
      provide: Tokens.META_COMPARTILHADA_OPERATIONS,
      useClass: MetaCompartilhadaService,
    },
  ],
})
export class MetaCompartilhadaModule {}
