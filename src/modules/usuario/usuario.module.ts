import { ExameCompartilhadoModule } from '@modules/exame-compartilhado/exame-compartilhado.module';
import { ExameItemModule } from '@modules/exame-item/exame-item.module';
import { ExameModule } from '@modules/exame/exame.module';
import { MetaModule } from '@modules/metas/meta.module';
import { AntropometriaModule } from '@modules/metas/modules/antropometria/antropometria.module';
import { UserResolver } from '@modules/usuario/user.resolver';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';
import { Usuario } from 'src/types/entities/usuario.entity';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

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
    UserResolver,
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
