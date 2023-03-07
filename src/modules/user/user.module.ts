import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from "./user.controller";
import { UserResolver } from "./user.resolver";
import { User } from "src/types/entities/user.entity";
import { Tokens } from "@utils/tokens";


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