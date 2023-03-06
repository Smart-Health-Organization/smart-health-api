import { Module } from "@nestjs/common";
import { Tokens } from "src/utils/tokens";
import { UserService } from "./user.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "src/types/entities/user.entity";
import { UserController } from "./user.controller";
import { UserResolver } from "./user.resolver";


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    UserResolver,
    {
      provide: Tokens.USER_OPERATIONS,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: Tokens.USER_OPERATIONS,
      useClass: UserService,
    },
  ],
})
export class UserModule {}