import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { Tokens } from '@utils/tokens';
import { ExameItemOperations } from './exame-item.operations';

@Controller('exames')
export class ExameItemController {
  constructor(
    @Inject(Tokens.EXAME_ITEM_OPERATIONS) private readonly service: ExameItemOperations,
  ) {}




  
}
