import { CreateUsuarioInsertDto } from '@app/types/dtos/insert/create-user.insert.dto';
import { CreateExameItems } from '@app/types/dtos/insert/exame-item.insert.dto';
import { RedefinirSenhaInsertDto } from '@app/types/dtos/insert/redefinir-senha.insert.dto';
import { UpdateUsuarioInsertDto } from '@app/types/dtos/insert/update-usuario.insert.dto';
import { ExameResponseDto } from '@app/types/dtos/response/exame.response.dto';
import { UsuarioResponseDto } from '@app/types/dtos/response/user.response.dto';
import { ExameItemOperations } from '@modules/exame-item/exame-item.operations';
import { ExameOperations } from '@modules/exame/exame.operations';
import { ExamesAndExameItemsResponseType } from '@modules/exame/type/exame-and-exame-items.response.type';
import { ExameItemsMapResponseType } from '@modules/exame/type/exame-items-map.response.type';
import { UsuarioAssembler } from '@modules/usuario/assembler/usuarioAssembler';
import { UsuarioOperations } from '@modules/usuario/usuario.operations';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Tokens } from '@utils/tokens';

@ApiBearerAuth()
@ApiTags('Usuario')
@Controller('usuarios')
export class UsuarioController {
  constructor(
    @Inject(Tokens.USUARIO_OPERATIONS)
    private readonly service: UsuarioOperations,
    @Inject(Tokens.EXAME_OPERATIONS)
    private readonly exameService: ExameOperations,
    @Inject(Tokens.EXAME_ITEM_OPERATIONS)
    private readonly exameItemservice: ExameItemOperations,
  ) {}

  @Post()
  @ApiBody({ type: CreateUsuarioInsertDto })
  @ApiOkResponse({
    description: 'Usuario Criado',
    type: UsuarioResponseDto,
  })
  async criarUsuario(
    @Body() data: CreateUsuarioInsertDto,
  ): Promise<UsuarioResponseDto> {
    return await this.service.postUsuario(data);
  }

  @Post(':id/exames')
  @ApiBody({ type: CreateExameItems })
  @ApiOkResponse({
    description: 'Exame criado',
    type: ExameResponseDto,
  })
  async criarExame(
    @Param('id') id: string,
    @Body() data: CreateExameItems,
  ): Promise<ExameResponseDto> {
    this.exameItemservice.verifyDuplicateMetrics(data.itens);
    const user = await this.service.getUsuarioById(id);
    const exame = await this.exameService.createExame(user, data.data);
    const exameToCreateItems = {
      id: exame.id,
      data: exame.data,
      itens: exame.itens,
      user: user,
    };
    await this.exameItemservice.createExameItems(
      user,
      exameToCreateItems,
      data.itens,
    );
    return exame;
  }

  @Get(':id/exames')
  @ApiOkResponse({
    description: 'Exames retornados',
    type: ExamesAndExameItemsResponseType,
  })
  async findExamesByUsuario(
    @Param('id') id: string,
  ): Promise<ExamesAndExameItemsResponseType> {
    const exames = await this.exameService.getExamesByUserId(id);
    return exames;
  }

  @Get(':id/exame-itens')
  @ApiOkResponse({
    description: 'Itens de todos os exames retornados',
    type: ExameItemsMapResponseType,
  })
  async findExameItems(
    @Param('id') id: string,
  ): Promise<ExameItemsMapResponseType> {
    const exameItems = await this.exameService.getExameItemsFromAllExamsByUser(
      id,
    );
    return exameItems;
  }

  @Patch('/:id')
  @ApiBody({ type: UpdateUsuarioInsertDto })
  @ApiOkResponse({
    description: 'Usuario atualizado',
    type: UsuarioResponseDto,
  })
  async atualizarUsuario(
    @Body() data: UpdateUsuarioInsertDto,
    @Param('id') id: string,
  ): Promise<UsuarioResponseDto> {
    return await this.service.updateUsuario(id, data);
  }

  @Patch('/:id/redefinir-senha')
  @ApiBody({ type: RedefinirSenhaInsertDto })
  @ApiOkResponse({
    description: 'Senha atualizada',
    type: UsuarioResponseDto,
  })
  async atualizarSenha(
    @Body() data: RedefinirSenhaInsertDto,
    @Param('id') id: string,
  ): Promise<UsuarioResponseDto> {
    return await this.service.updateSenhaUsuario(id, data);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Usiário criado',
    type: UsuarioResponseDto,
  })
  async getUsuarioById(@Param('id') id: string): Promise<UsuarioResponseDto> {
    const user = await this.service.getUsuarioById(id);
    const userDto = UsuarioAssembler.assembleUserToDto(user);
    return userDto;
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteUsuario(@Param('id') id: string): Promise<void> {
    await this.service.deleteUsuario(id);
  }
}
