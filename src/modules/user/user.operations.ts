import { CreateUserDto } from 'src/types/dtos/create-user.dto';
import { UpdateUserDto } from 'src/types/dtos/update-user.dto';
import { UserResponseDto } from 'src/types/dtos/user.response.dto';
import { User } from 'src/types/entities/user.entity';

export interface Operations {
  getUsers(): Promise<UserResponseDto[]>;
  createUser(data: CreateUserDto): Promise<UserResponseDto>;
  getUserById(id: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  updateUser(id: string, data: UpdateUserDto): Promise<User>;
  deleteUser(id: string): Promise<boolean>;
}
