import { Usuario } from '@app/types/entities/usuario.entity';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';
import { AuthService } from 'src/auth/auth.service';
import { UsuarioService } from 'src/modules/usuario/usuario.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '1000d',
        },
      }),
    }),
  ],
  controllers: [AuthController],

  providers: [
    {
      provide: Tokens.AUTH_OPERATIONS,
      useClass: AuthService,
    },
    {
      provide: Tokens.USUARIO_OPERATIONS,
      useClass: UsuarioService,
    },
    AuthService,
    AuthResolver,
    UsuarioService,
    // JwtStrategy,
  ],
  exports: [
    {
      provide: Tokens.AUTH_OPERATIONS,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
