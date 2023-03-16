import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/modules/user/user.service';
import { CreateUserDto } from 'src/types/dtos/create-user.dto';
import { UserResponseDto } from 'src/types/dtos/user.response.dto';
import { User } from 'src/types/entities/user.entity';
import { GqlAuthGuard } from './../../auth/auth.guard';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<UserResponseDto[]> {
    const users = await this.userService.getUsers();
    return users;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async findUserById(@Args('id') id: string): Promise<User> {
    const user = await this.userService.getUserById(id);
    return user;
  }

  @Query(() => User)
  async findUserByEmail(@Args('email') email: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);
    return user;
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userService.createUser(data);
    return user;
  }

  // @Mutation(() => User)
  // async updateUser(
  //   @Args('id') id: string,
  //   @Args('data') data: UpdateUserDto,
  // ): Promise<User> {
  //   const user = await this.userService.updateUser(id, data);
  //   return user;
  // }

  // @Mutation(() => Boolean)
  // async deleteUser(@Args('id') id: string): Promise<boolean> {
  //   return await this.userService.deleteUser(id);
  // }
}
