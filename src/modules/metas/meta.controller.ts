import { MetaOperations } from '@modules/metas/meta.operations';
import { UsuarioOperations } from '@modules/usuario/usuario.operations';
import { Controller, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Tokens } from '@utils/tokens';

@ApiBearerAuth()
@ApiTags('Metas')
@Controller('metas')
export class MetaController {
  constructor(
    @Inject(Tokens.META_OPERATIONS) private readonly service: MetaOperations,
    @Inject(Tokens.USUARIO_OPERATIONS)
    private readonly usuarioService: UsuarioOperations,
  ) {}
}
