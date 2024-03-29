import { AuthService } from '@app/auth/auth.service';
import { AuthInput } from '@app/auth/dto/auth.input';
import { AuthType } from '@app/auth/dto/auth.type';
import { CreateUsuarioInsertDto } from '@app/types/dtos/insert/create-usuario.insert.dto';
import { UsuarioResponseDto } from '@app/types/dtos/response/usuario.response.dto';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Tokens } from '@utils/tokens';
import { UsuarioService } from './../modules/usuario/usuario.service';

@ApiTags('Autenticação')
@Controller('')
export class AuthController {
  constructor(
    @Inject(Tokens.AUTH_OPERATIONS) private readonly authService: AuthService,
    @Inject(Tokens.USUARIO_OPERATIONS)
    private readonly userService: UsuarioService,
  ) {}

  @Post('login')
  @ApiBody({ type: AuthInput })
  @ApiOkResponse({
    description: 'Usuário logado e token gerado',
    type: AuthType,
  })
  async validateUser(@Body() data: AuthInput): Promise<AuthType> {
    const user = await this.authService.validateUser(data);
    return user;
  }

  @Post('signup')
  @ApiBody({ type: CreateUsuarioInsertDto })
  @ApiOkResponse({
    description: 'Usuário criado',
    type: UsuarioResponseDto,
  })
  async postUsuario(
    @Body() data: CreateUsuarioInsertDto,
  ): Promise<UsuarioResponseDto> {
    const user = await this.userService.postUsuario(data);
    return user;
  }
}
