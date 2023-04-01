import { ExameItemModule } from '@modules/exame-item/exame-item.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';
import { Exame } from 'src/types/entities/exame.entity';
import { ExameController } from './exame.controller';
import { ExameResolver } from './exame.resolver';
import { ExameService } from './exame.service';

@Module({
  imports: [ExameItemModule, TypeOrmModule.forFeature([Exame])],
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
