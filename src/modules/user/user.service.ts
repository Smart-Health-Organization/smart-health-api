import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/types/dtos/create-user.dto';
import { UpdateUserDto } from 'src/types/dtos/update-user.dto';
import { User } from 'src/types/entities/user.entity';
import { Repository } from 'typeorm';
import { Operations } from './user.operations';

@Injectable()
export class UserService implements Operations {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createUser(data: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(data);
    const userSaved = await this.userRepository.save(user);

    if (!userSaved) {
      throw new InternalServerErrorException('User was not created');
    }
    return userSaved;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
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
