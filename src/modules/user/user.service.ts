import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/types/entities/user.entity';
import { Repository } from 'typeorm';
import { Operations } from './user.operations';

@Injectable()
export class UserService implements Operations {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }
}