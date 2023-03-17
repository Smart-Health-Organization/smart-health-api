import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Tokens } from '@utils/tokens';
import { AuthService } from 'src/auth/auth.service';
import { AuthInput } from 'src/auth/dto/auth.input';
import { AuthType } from 'src/auth/dto/auth.type';
import { CreateUserDto } from 'src/types/dtos/create-user.dto';
import { UserResponseDto } from 'src/types/dtos/user.response.dto';
import { User } from 'src/types/entities/user.entity';
import { UserService } from './../modules/user/user.service';

@Controller('')
export class AuthController {
  constructor(
    @Inject(Tokens.AUTH_OPERATIONS) private readonly authService: AuthService,
    @Inject(Tokens.USER_OPERATIONS) private readonly userService: UserService,
  ) {}

  @Post('login')
  async validateUser(@Body() data: AuthInput): Promise<AuthType> {
    const user = await this.authService.validateUser(data);
    return user;
  }

  @Post('signup')
  async createUser(@Body() data: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userService.createUser(data);
    return user;
  }
}
