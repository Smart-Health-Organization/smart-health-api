import { ExameItemModule } from '@modules/exame copy/exame-item.module';
import { ExameItemService } from '@modules/exame copy/exame-item.service';
import { ExameModule } from '@modules/exame/exame.module';
import { ExameService } from '@modules/exame/exame.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';
import { ExameItem } from 'src/types/entities/exame-item.entity';
import { Exame } from 'src/types/entities/exame.entity';
import { User } from 'src/types/entities/user.entity';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ExameModule,
    ExameItemModule

  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserResolver,
    {
      provide: Tokens.USER_OPERATIONS,
      useClass: UserService,
    }
   
  ],
  exports: [
    {
      provide: Tokens.USER_OPERATIONS,
      useClass: UserService,
    }
  ],
})
export class UserModule {}
