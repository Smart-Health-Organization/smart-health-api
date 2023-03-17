import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/types/dtos/create-user.dto';
import { UpdateUserDto } from 'src/types/dtos/update-user.dto';
import { UserResponseDto } from 'src/types/dtos/user.response.dto';
import { Repository } from 'typeorm';
import { User } from '../../types/entities/user.entity';
import { UserAssembler } from './assembler/userAssembler';
import { Operations } from './user.operations';

@Injectable()
export class UserService implements Operations {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createUser(data: CreateUserDto): Promise<UserResponseDto> {
    const userAlredyExist = await this.getUserByEmail(data.email);
    if (userAlredyExist) {
      throw new InternalServerErrorException('User already exists');
    }
    const user = this.userRepository.create(data);
    const userSaved = await this.userRepository.save(user);
    if (!userSaved) {
      throw new InternalServerErrorException('User was not created');
    }
    const userDto = UserAssembler.assembleCreateUserToDto(userSaved);
    return userDto;
  }

  async getUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    const usersDto = UserAssembler.assembleUsersToDto(users);
    return usersDto;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);
    await this.userRepository.update(user, { ...data });

    //cria-se esse objeto porque em update faltam propriedades do tipo user
    const userUpdated = this.userRepository.create({ ...user, ...data });
    return userUpdated;
  }

  async deleteUser(id: string): Promise<boolean> {
    await this.getUserById(id);
    const deleted = await this.userRepository.delete(id);
    if (deleted) return true;
    return false;
  }
}
