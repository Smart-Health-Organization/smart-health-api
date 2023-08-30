import { CreateUsuarioInsertDto } from '@app/types/dtos/insert/create-usuario.insert.dto';
import { UpdateUsuarioInsertDto } from '@app/types/dtos/insert/update-usuario.insert.dto';
import { UsuarioResponseDto } from '@app/types/dtos/response/usuario.response.dto';
import { Usuario } from '@app/types/entities/usuario.entity';
import { UsuarioService } from '@modules/usuario/usuario.service';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../../auth/auth.guard';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UsuarioService) {}

  @Query(() => [Usuario])
  async users(): Promise<UsuarioResponseDto[]> {
    const users = await this.userService.getUsuarios();
    return users;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Usuario)
  async findUsuarioById(@Args('id') id: string): Promise<Usuario> {
    const user = await this.userService.getUsuarioById(id);
    return user;
  }

  @Query(() => Usuario)
  async findUsuarioByEmail(@Args('email') email: string): Promise<Usuario> {
    const user = await this.userService.getUsuarioByEmail(email);
    return user;
  }

  @Mutation(() => Usuario)
  async createUsuario(
    @Args('data') data: CreateUsuarioInsertDto,
  ): Promise<UsuarioResponseDto> {
    const user = await this.userService.postUsuario(data);
    return user;
  }

  @Mutation(() => Usuario)
  async updateUsuario(
    @Args('id') id: string,
    @Args('data') data: UpdateUsuarioInsertDto,
  ): Promise<UsuarioResponseDto> {
    const user = await this.userService.updateUsuario(id, data);
    return user;
  }

  // @Mutation(() => Boolean)
  // async deleteUser(@Args('id') id: string): Promise<boolean> {
  //   return await this.userService.deleteUser(id);
  // }
}
