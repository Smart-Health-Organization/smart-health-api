import { AntropometriaOperations } from '@modules/metas/modules/antropometria/antropometria.operations';
import { Controller, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Tokens } from '@utils/tokens';

@ApiBearerAuth()
@ApiTags('Antropometria')
@Controller('antropometrias')
export class AntropometriaController {
  constructor(
    @Inject(Tokens.ANTROPOMETRIA_OPERATIONS)
    private readonly service: AntropometriaOperations,
  ) {}
}
