import { ExameEItensCompartilhadoResponse } from '@modules/exame-compartilhado/type/exame-e-itens-compartilhados.response';
import { LoginRequest } from '@modules/exame-compartilhado/type/login.request';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Tokens } from '@utils/tokens';
import { ExameCompartilhadoOperations } from './exame-compartilhado.operations';

@ApiTags('Exame Compartilhado')
@Controller('exames-compartilhados')
export class ExameCompartilhadoController {
  constructor(
    @Inject(Tokens.EXAME_COMPARTILHADO_OPERATIONS)
    private readonly service: ExameCompartilhadoOperations,
  ) {}

  @Get('/:login')
  @ApiOkResponse({
    description: 'Confirmação de existência de um exame compartilhado',
    type: Boolean,
  })
  getExameCompartilhadoByLogin(@Param('login') login: string) {
    return this.service.getExameCompartilhadoByLogin(login);
  }

  @Post()
  @ApiOkResponse({
    description: 'Retorna itens do exame compartilhado',
    type: ExameEItensCompartilhadoResponse,
  })
  getExameCompartilhadoByLoginAndSenha(@Body() data: LoginRequest) {
    return this.service.getExameCompartilhadoByLoginAndSenha(data);
  }
}
