import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from 'src/modules/user/user.service';
import { CreateUserDto } from "src/types/dtos/create-user.dto";
import { UpdateUserDto } from "src/types/dtos/update-user.dto";
import { User } from "src/types/entities/user.entity";


@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await this.userService.getUsers();
    return users;
  }

  @Query(() => User)
  async findUserById(@Args('id') id: string): Promise<User> {
    const user = await this.findUserById(id);
    return user;
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserDto): Promise<User> {
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