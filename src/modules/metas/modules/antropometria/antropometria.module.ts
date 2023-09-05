import { Antropometria } from '@app/types/entities/antropometria.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';
import { AntropometriaController } from './antropometria.controller';
import { AntropometriaService } from './antropometria.service';

@Module({
  imports: [TypeOrmModule.forFeature([Antropometria])],
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
export class AntropometriaModule {}
