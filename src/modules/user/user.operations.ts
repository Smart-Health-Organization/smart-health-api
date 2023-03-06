import { User } from "src/types/entities/user.entity";

export interface Operations {
  getUsers(): Promise<User[]>;
  }