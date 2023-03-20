import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Tokens } from '@utils/tokens';
import { ExameOperations } from './exame.operations';

@Controller('exames')
export class ExameController {
  constructor(
    @Inject(Tokens.EXAME_OPERATIONS) private readonly service: ExameOperations,
  ) {}

  @Get()
  getExames() {
    return this.service.getExames();
  }

  // @Post()
  // async createExame(@Body() data: CreateExameDto): Promise<ExameResponseDto> {
  //   const exame = await this.service.createExame(data);
  //   return exame;
  // }

  // @Patch('/:id')
  // async updateExame(
  //   @Body() data: UpdateExameDto,
  //   @Param('id') id: string,
  // ): Promise<Exame> {
  //   const exame = await this.service.updateExame(id, data);
  //   return exame;
  // }

  @Get('/:id')
  getExameById(@Param('id') id: string) {
    return this.service.getExameById(id);
  }

  // @Delete('/:id')
  // @HttpCode(204)
  // deleteExame(@Param('id') id: string) {
  //   return this.service.deleteExame(id);
  // }
}
