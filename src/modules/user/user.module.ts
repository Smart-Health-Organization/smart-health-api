import { ExameService } from '@modules/exame/exame.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';
import { Exame } from 'src/types/entities/exame.entity';
import { User } from 'src/types/entities/user.entity';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Exame]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserResolver,
    {
      provide: Tokens.USER_OPERATIONS,
      useClass: UserService,
    },
    {
      provide: Tokens.EXAME_OPERATIONS,
      useClass: ExameService,
    },
  ],
  exports: [
    {
      provide: Tokens.USER_OPERATIONS,
      useClass: UserService,
    },
    {
      provide: Tokens.EXAME_OPERATIONS,
      useClass: ExameService,
    },
  ],
})
export class UserModule {}
