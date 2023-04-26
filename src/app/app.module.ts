import { BaseModule } from '@modules/base/base.module';
import { ExameModule } from '@modules/exame/exame.module';
import { MetricaModule } from '@modules/metrica/metrica.module';
import { LimiteModule } from '@modules/metrica/modules/limite/limite.module';
import { PdfManipulatorModule } from '@modules/pdf-manipulator/pdf-manipulator.module';
import { UserModule } from '@modules/user/user.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from 'src/auth/auth.module';
import { JwtMiddleware } from 'src/auth/jwt.middleware';
const ormconfig = require('../../ormconfig.js');
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(ormconfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    BaseModule,
    UserModule,
    AuthModule,
    ExameModule,
    MetricaModule,
    LimiteModule,
    PdfManipulatorModule,
    RouterModule.register([
      {
        path: 'metricas',
        module: MetricaModule,
        children: [
          {
            path: 'limtes',
            module: LimiteModule,
          },
        ],
      },
    ]),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: '/login', method: RequestMethod.POST },
        { path: '/signup', method: RequestMethod.POST },
        { path: '/graphql', method: RequestMethod.ALL },
      )
      .forRoutes('*');
    //TODO -> remove this comment to limit user only to see this content in /users/:id
    // consumer
    //   .apply(UserMiddleware)
    //   .forRoutes({ path: '/users/*', method: RequestMethod.ALL });
  }
}
