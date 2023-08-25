import { CreateMetaInsertDto } from '@app/types/dtos/insert/create-meta.insert.dto';
import { CreateUsuarioInsertDto } from '@app/types/dtos/insert/create-user.insert.dto';
import { ExameCompartilhadoInsertDto } from '@app/types/dtos/insert/exame-compartilhado.request.dto';
import { CreateExameItems } from '@app/types/dtos/insert/exame-item.insert.dto';
import { RedefinirSenhaInsertDto } from '@app/types/dtos/insert/redefinir-senha.insert.dto';
import { UpdateUsuarioInsertDto } from '@app/types/dtos/insert/update-usuario.insert.dto';
import { ExameResponseDto } from '@app/types/dtos/response/exame.response.dto';
import { MetaResponseDto } from '@app/types/dtos/response/meta.response.dto';
import { UsuarioResponseDto } from '@app/types/dtos/response/user.response.dto';
import { ExameCompartilhadoOperations } from '@modules/exame-compartilhado/exame-compartilhado.operations';
import { ExameCompartilhadoResponse } from '@modules/exame-compartilhado/type/exame-compartilhado.response';
import { ExameItemOperations } from '@modules/exame-item/exame-item.operations';
import { ExameOperations } from '@modules/exame/exame.operations';
import { ExamesAndExameItemsResponseType } from '@modules/exame/type/exame-and-exame-items.response.type';
import { ExameItemsMapResponseType } from '@modules/exame/type/exame-items-map.response.type';
import { MetaOperations } from '@modules/metas/meta.operations';
import { UsuarioAssembler } from '@modules/usuario/assembler/usuarioAssembler';
import { UsuarioExameCompartilhadoResponseType } from '@modules/usuario/type/exame-compartilhado-response.type';
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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
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
    @Inject(Tokens.EXAME_COMPARTILHADO_OPERATIONS)
    private readonly exameCompartilhadoService: ExameCompartilhadoOperations,
    @Inject(Tokens.META_OPERATIONS)
    private readonly metaService: MetaOperations,
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
    const userDto = UsuarioAssembler.assembleUsuarioToDto(user);
    return userDto;
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteUsuario(@Param('id') id: string): Promise<void> {
    await this.service.deleteUsuario(id);
  }

  @Post('/:id/exames-compartilhados')
  @HttpCode(201)
  async createExameCompartilhado(
    @Param('id') id: string,
    @Body() data: ExameCompartilhadoInsertDto,
  ): Promise<ExameCompartilhadoResponse> {
    const usuario = await this.service.getUsuarioById(id);
    const exameCompartilhado =
      await this.exameCompartilhadoService.criarExameCompartilhado(
        usuario,
        data,
      );
    return exameCompartilhado;
  }

  @Get('/:id/exames-compartilhados')
  @ApiOkResponse({
    description: 'Usiário criado',
    type: [UsuarioExameCompartilhadoResponseType],
  })
  async getExamesCompartilhadosPorUsuario(@Param('id') id: string) {
    return await this.exameCompartilhadoService.getExamesCompartilhadosPorUsuario(
      id,
    );
  }

  @Delete('/:userId/exames-compartilhados/:exameCompartilhadoId')
  @HttpCode(204)
  async deleteExameCompartilhado(
    @Param('userId') userId: string,
    @Param('exameCompartilhadoId') exameCompartilhadoId: string,
  ): Promise<void> {
    const usuario = await this.service.getUsuarioById(userId);
    return await this.exameCompartilhadoService.deleteExamesCompartilhado(
      usuario,
      exameCompartilhadoId,
    );
  }

  @ApiOkResponse({
    description: 'Metas do usuário recuperadas',
    type: [MetaResponseDto],
  })
  @Get('/:usuarioId/metas')
  async getMetasByUsuarioId(@Param('usuarioId') usuarioId: string) {
    const usuario = await this.service.getUsuarioById(usuarioId);
    return await this.metaService.getMetasByUsuarioId(usuario.id);
  }

  @ApiOkResponse({
    description: 'Meta criada',
    type: MetaResponseDto,
  })
  @Post('/:usuarioId/metas')
  async postMetasByUsuarioId(
    @Param('usuarioId') usuarioId: string,
    @Body() data: CreateMetaInsertDto,
  ) {
    const usuario = await this.service.getUsuarioById(usuarioId);
    return await this.metaService.postMetas(usuario, data);
  }

  @ApiOkResponse({
    description: 'Meta concluída',
    type: MetaResponseDto,
  })
  @Patch('/:usuarioId/metas/:metaId')
  async concluirMeta(
    @Param('usuarioId') usuarioId: string,
    @Param('metaId') metaId: string,
  ) {
    await this.service.getUsuarioById(usuarioId);
    return await this.metaService.concluirMeta(+usuarioId, +metaId);
  }

  @Delete('/:usuarioId/metas/:metaId')
  @HttpCode(204)
  async deletarMeta(@Param('metaId') metaId: string) {
    return await this.metaService.deleteMeta(+metaId);
  }
}
