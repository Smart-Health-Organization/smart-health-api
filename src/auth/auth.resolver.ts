import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthInput } from 'src/auth/dto/auth.input';
import { AuthService } from './auth.service';
import { AuthType } from './dto/auth.type';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthType)
  public async login(@Args('data') data: AuthInput): Promise<AuthType> {
    const response = await this.authService.validateUser(data);

    return {
      usuario: response.usuario,
      token: response.token,
    };
  }
}
