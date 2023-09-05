import { Meta } from '@app/types/entities/meta.entity';
import { MetaService } from '@modules/metas/meta.service';
import { AntropometriaModule } from '@modules/metas/modules/antropometria/antropometria.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';

@Module({
  imports: [TypeOrmModule.forFeature([Meta]), AntropometriaModule],
  controllers: [],
  providers: [
    MetaService,
    {
      provide: Tokens.META_OPERATIONS,
      useClass: MetaService,
    },
  ],
  exports: [
    {
      provide: Tokens.META_OPERATIONS,
      useClass: MetaService,
    },
  ],
})
export class MetaModule {}
