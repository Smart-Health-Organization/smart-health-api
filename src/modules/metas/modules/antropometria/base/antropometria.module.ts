import { Module } from '@nestjs/common';
import { Tokens } from '@utils/tokens';
import { AntropometriaController } from './antropometria.controller';
import { AntropometriaService } from './antropometria.service';

@Module({
  imports: [],
  controllers: [AntropometriaController],
  providers: [
    {
      provide: Tokens.ANTROPOMETRIA_OPERATIONS,
      useClass: AntropometriaService,
    },
  ],
  exports: [
    {
      provide: Tokens.ANTROPOMETRIA_OPERATIONS,
      useClass: AntropometriaService,
    },
  ],
})
export class BaseModule {}
