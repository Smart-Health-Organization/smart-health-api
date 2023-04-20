import { ExameItemOperations } from '@modules/exame-item/exame-item.operations';
import { ExameOperations } from '@modules/exame/exame.operations';
import {
  ExameAndExameItemsResponseType,
  ExamesAndExameItemsResponseType,
} from '@modules/exame/type/exame-and-exame-items.response.type';
import { ExameItemsMapResponseType } from '@modules/exame/type/exame-items-map.response.type';
import { ResetPassword } from '@modules/user/type/reset-password.type';
import { Operations } from '@modules/user/user.operations';
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
import { InsertExameItems } from 'src/types/dtos/exame-item.insert.dto';
import { ExameResponseDto } from 'src/types/dtos/exame.response.dto';
import { UpdateUserDto } from 'src/types/dtos/update-user.dto';
import { UserResponseDto } from 'src/types/dtos/user.response.dto';
import { User } from 'src/types/entities/user.entity';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    @Inject(Tokens.USER_OPERATIONS) private readonly service: Operations,
    @Inject(Tokens.EXAME_OPERATIONS)
    private readonly exameService: ExameOperations,
    @Inject(Tokens.EXAME_ITEM_OPERATIONS)
    private readonly exameItemservice: ExameItemOperations,
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

  @Post(':id/exames')
  @ApiBody({ type: InsertExameItems })
  @ApiOkResponse({
    description: 'Exame created',
    type: ExameResponseDto,
  })
  async createExame(
    @Param('id') id: string,
    @Body() data: InsertExameItems,
  ): Promise<ExameResponseDto> {
    const user = await this.getUserById(id);
    const exame = await this.exameService.createExame(user);
    await this.exameItemservice.createExameItems(user, exame, data.itens);
    return exame;
  }

  @Get(':id/exames')
  @ApiOkResponse({
    description: 'Exames returned',
    type: [ExameAndExameItemsResponseType],
  })
  async findExamesByUser(
    @Param('id') id: string,
  ): Promise<ExamesAndExameItemsResponseType> {
    const exames = await this.exameService.getExamesByUserId(id);
    return exames;
  }

  @Get(':id/exame-items')
  @ApiOkResponse({
    description: 'Items from all exams returned',
    type: ExameItemsMapResponseType,
  })
  async findExameItems(@Param('id') id: string): Promise<any> {
    const exameItems = await this.exameService.getExameItemsFromAllExamsByUser(
      id,
    );
    return exameItems;
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
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.service.getUserById(id);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.service.deleteUser(id);
  }
}
