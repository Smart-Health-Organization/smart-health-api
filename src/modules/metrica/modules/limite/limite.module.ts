import { Limite } from '@app/types/entities/limite.entity';
import { LimiteService } from '@modules/metrica/modules/limite/limite.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';
import { LimiteController } from './limite.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Limite])],
  controllers: [LimiteController],
  providers: [
    LimiteService,
    {
      provide: Tokens.LIMITE_OPERATIONS,
      useClass: LimiteService,
    },
  ],
  exports: [
    {
      provide: Tokens.LIMITE_OPERATIONS,
      useClass: LimiteService,
    },
  ],
})
export class LimiteModule {}
