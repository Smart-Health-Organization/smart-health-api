import {  CreateUserDto } from "src/types/dtos/create-user.dto";
import { UpdateUserDto } from "src/types/dtos/update-user.dto";
import { User } from "src/types/entities/user.entity";

export interface Operations {
  getUsers(): Promise<User[]>;
  createUser(data: CreateUserDto): Promise<User>;
  getUserById(id: string): Promise<User>;
  updateUser(id: string, data: UpdateUserDto): Promise<User>;
  deleteUser(id: string): Promise<boolean>;
  }