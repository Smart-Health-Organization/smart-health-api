import { Usuario } from '@app/types/entities/usuario.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { AuthInput } from 'src/auth/dto/auth.input';
import { AuthType } from 'src/auth/dto/auth.type';
import { UsuarioService } from 'src/modules/usuario/usuario.service';

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

    const validPassword = compareSync(data.password, user.senha);

    if (!validPassword) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }

    const token = await this.jwtToken(user);
    return {
      user,
      token,
    };
  }

  private async jwtToken(user: Usuario): Promise<string> {
    const payload = { username: user.nome, sub: user.id };
    return this.jwtService.signAsync(payload);
  }
}
