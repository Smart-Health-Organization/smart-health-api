import { Usuario } from '@app/types/entities/usuario.entity';
import { ExameItemModule } from '@modules/exame-item/exame-item.module';
import { ExameModule } from '@modules/exame/exame.module';
import { UsuarioController } from '@modules/usuario/usuario.controller';
import { UsuarioService } from '@modules/usuario/usuario.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), ExameModule, ExameItemModule],
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
