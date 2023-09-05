import { AuthInput } from '@app/auth/dto/auth.input';
import { AuthType } from '@app/auth/dto/auth.type';
import { Usuario } from '@app/types/entities/usuario.entity';
import { UsuarioService } from '@modules/usuario/usuario.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this.userService.getUsuarioByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }

    const validPassword = compareSync(data.senha, user.senha);

    if (!validPassword) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }

    const token = await this.jwtToken(user);
    return {
      usuario: user,
      token,
    };
  }

  private async jwtToken(user: Usuario): Promise<string> {
    const payload = { username: user.nome, sub: user.id };
    return this.jwtService.signAsync(payload);
  }
}
