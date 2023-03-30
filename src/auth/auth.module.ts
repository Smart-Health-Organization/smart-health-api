import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from '@utils/tokens';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/types/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '1000d',
        },
      }),
    }),
  ],
  controllers: [AuthController],

  providers: [
    {
      provide: Tokens.AUTH_OPERATIONS,
      useClass: AuthService,
    },
    {
      provide: Tokens.USER_OPERATIONS,
      useClass: UserService,
    },
    AuthService,
    AuthResolver,
    UserService,
    // JwtStrategy,
  ],
  exports: [
    {
      provide: Tokens.AUTH_OPERATIONS,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
