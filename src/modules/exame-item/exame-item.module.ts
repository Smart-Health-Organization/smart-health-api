import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';
import { ExameItem } from 'src/types/entities/exame-item.entity';
import { ExameItemController } from './exame-item.controller';
import { ExameItemResolver } from './exame-item.resolver';
import { ExameItemService } from './exame-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExameItem])],
  controllers: [ExameItemController],
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
