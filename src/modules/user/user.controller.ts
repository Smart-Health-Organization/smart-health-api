import { ResetPassword } from '@modules/user/type/reset-password.type';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Tokens } from '@utils/tokens';
import { CreateUserDto } from 'src/types/dtos/create-user.dto';
import { UpdateUserDto } from 'src/types/dtos/update-user.dto';
import { UserResponseDto } from 'src/types/dtos/user.response.dto';
import { Operations } from './user.operations';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    @Inject(Tokens.USER_OPERATIONS) private readonly service: Operations,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'List of users ',
    type: [UserResponseDto],
  })
  async getUsers(): Promise<UserResponseDto[]> {
    return await this.service.getUsers();
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({
    description: 'User created',
    type: UserResponseDto,
  })
  async createUser(@Body() data: CreateUserDto): Promise<UserResponseDto> {
    return await this.service.createUser(data);
  }

  @Patch('/:id')
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({
    description: 'User updated',
    type: UserResponseDto,
  })
  async updateUser(
    @Body() data: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<UserResponseDto> {
    return await this.service.updateUser(id, data);
  }

  @Patch('/:id/resetpassword')
  @ApiBody({ type: ResetPassword })
  @ApiOkResponse({
    description: 'Password updated',
    type: UserResponseDto,
  })
  async updateUserPassword(
    @Body() data: ResetPassword,
    @Param('id') id: string,
  ): Promise<UserResponseDto> {
    return await this.service.updateUserPassword(id, data);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'User Created',
    type: UserResponseDto,
  })
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.service.getUserById(id);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.service.deleteUser(id);
  }
}
