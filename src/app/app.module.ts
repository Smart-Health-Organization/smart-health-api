import { UserMiddleware } from '@app/auth/user.middleware';
import { BaseModule } from '@modules/base/base.module';
import { ExameCompartilhadoModule } from '@modules/exame-compartilhado/exame-compartilhado.module';
import { ExameModule } from '@modules/exame/exame.module';
import { MetricaModule } from '@modules/metrica/metrica.module';
import { LimiteModule } from '@modules/metrica/modules/limite/limite.module';
import { PdfManipulatorModule } from '@modules/pdf-manipulator/pdf-manipulator.module';
import { UsuarioModule } from '@modules/usuario/usuario.module';
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
    UsuarioModule,
    AuthModule,
    ExameModule,
    MetricaModule,
    LimiteModule,
    ExameCompartilhadoModule,
    PdfManipulatorModule,
    RouterModule.register([
      {
        path: 'metricas',
        module: MetricaModule,
        children: [
          {
            path: 'limites',
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
        { path: '/exames-compartilhados', method: RequestMethod.POST },
        { path: '/exames-compartilhados/:login', method: RequestMethod.GET },
      )
      .forRoutes('*');
    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: '/usuarios/*', method: RequestMethod.ALL });
  }
}
