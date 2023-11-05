import { Usuario } from '@app/types/entities/usuario.entity';
import { ExameCompartilhadoModule } from '@modules/exame-compartilhado/exame-compartilhado.module';
import { ExameItemModule } from '@modules/exame-item/exame-item.module';
import { ExameModule } from '@modules/exame/exame.module';
import { MetaModule } from '@modules/metas/meta.module';
import { AntropometriaModule } from '@modules/metas/modules/antropometria/antropometria.module';
import { UsuarioController } from '@modules/usuario/usuario.controller';
import { UsuarioService } from '@modules/usuario/usuario.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    AntropometriaModule,
    ExameModule,
    MetaModule,
    ExameItemModule,
    ExameCompartilhadoModule,
  ],
  controllers: [UsuarioController],
  providers: [
    UsuarioService,
    {
      provide: Tokens.USUARIO_OPERATIONS,
      useClass: UsuarioService,
    },
  ],
  exports: [
    {
      provide: Tokens.USUARIO_OPERATIONS,
      useClass: UsuarioService,
    },
  ],
})
export class UsuarioModule {}
