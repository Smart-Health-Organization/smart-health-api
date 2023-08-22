import { Meta } from '@app/types/entities/meta.entity';
import { MetaService } from '@modules/metas/meta.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';

@Module({
  imports: [TypeOrmModule.forFeature([Meta])],
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
