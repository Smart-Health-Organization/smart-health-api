import { ResetPassword } from '@modules/user/type/reset-password.type';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { CreateUserDto } from 'src/types/dtos/create-user.dto';
import { UpdateUserDto } from 'src/types/dtos/update-user.dto';
import { UserResponseDto } from 'src/types/dtos/user.response.dto';
import { Repository } from 'typeorm';
import { User } from '../../types/entities/user.entity';
import { UserAssembler } from './assembler/userAssembler';
import { Operations } from './user.operations';
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(
  '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',
);

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
    // const msg = {
    //   to: user.email,
    //   from: 'thi.sanches@hotmail.com',
    //   subject: 'SEJA BEM VINDO!!!',
    //   text: 'Seja bem vindo a Smart Health',
    //   html: '<strong>estamos muito feliz em recebê-lo</strong>',
    // };
    // sgMail.send(msg);
    // .then(() => {
    //   console.log('Email sent');
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
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

  async updateUser(id: string, data: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.getUserById(id);
    const userAlredyExist = await this.getUserByEmail(data.email);
    if (userAlredyExist) {
      throw new InternalServerErrorException(
        'User already exists with this email',
      );
    }
    await this.userRepository.update(user, { ...data });

    //cria-se esse objeto porque em update faltam propriedades do tipo user
    const userUpdated = this.userRepository.create({ ...user, ...data });
    await this.userRepository.save(userUpdated);
    return UserAssembler.assembleCreateUserToDto(userUpdated);
  }

  async updateUserPassword(
    id: string,
    data: ResetPassword,
  ): Promise<UserResponseDto> {
    const user = await this.getUserById(id);
    const validPassword = compareSync(data.oldPassword, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Incorrect password');
    }
    await this.userRepository.update(id, { password: data.newPassword });

    const userUpdated = await this.getUserById(id);
    return UserAssembler.assembleCreateUserToDto(userUpdated);
  }

  async deleteUser(id: string): Promise<boolean> {
    await this.getUserById(id);
    const deleted = await this.userRepository.delete(id);
    if (deleted) return true;
    return false;
  }
}
