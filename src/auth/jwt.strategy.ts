import { Usuario } from '@app/types/entities/usuario.entity';
import { UsuarioService } from '@modules/usuario/usuario.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsuarioService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { sub: Usuario['id']; name: string }) {
    const user = this.userService.getUsuarioById(payload.sub.toString());

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}
