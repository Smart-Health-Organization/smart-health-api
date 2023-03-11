import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Tokens } from '@utils/tokens';
import { AuthService } from 'src/auth/auth.service';
import { AuthInput } from 'src/auth/dto/auth.input';
import { AuthType } from 'src/auth/dto/auth.type';

@Controller('')
export class AuthController {
  constructor(
    @Inject(Tokens.AUTH_OPERATIONS) private readonly authService: AuthService,
  ) {}

  @Post('login')
  async createUser(@Body() data: AuthInput): Promise<AuthType> {
    const user = await this.authService.validateUser(data);
    return user;
  }
}
