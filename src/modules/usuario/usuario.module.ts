import { ExameItemModule } from '@modules/exame-item/exame-item.module';
import { ExameModule } from '@modules/exame/exame.module';
import { UserResolver } from '@modules/usuario/user.resolver';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';
import { Usuario } from 'src/types/entities/usuario.entity';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), ExameModule, ExameItemModule],
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
