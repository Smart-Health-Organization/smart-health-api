import { ExameItemModule } from '@modules/exame-item/exame-item.module';
import { ExameModule } from '@modules/exame/exame.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';
import { User } from 'src/types/entities/user.entity';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ExameModule, ExameItemModule],
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
