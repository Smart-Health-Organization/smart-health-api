import { AuthModule } from '@app/auth/auth.module';
import { JwtMiddleware } from '@app/auth/jwt.middleware';
import { UserMiddleware } from '@app/auth/user.middleware';
import { BaseModule } from '@modules/base/base.module';
import { ExameCompartilhadoModule } from '@modules/exame-compartilhado/exame-compartilhado.module';
import { ExameModule } from '@modules/exame/exame.module';
import { MetaModule } from '@modules/metas/meta.module';
import { MetricaModule } from '@modules/metrica/metrica.module';
import { LimiteModule } from '@modules/metrica/modules/limite/limite.module';
import { PdfManipulatorModule } from '@modules/pdf-manipulator/pdf-manipulator.module';
import { UsuarioModule } from '@modules/usuario/usuario.module';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

const ormconfig = require('../../ormconfig.js');
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(ormconfig),
    BaseModule,
    UsuarioModule,
    AuthModule,
    ExameModule,
    MetricaModule,
    LimiteModule,
    ExameCompartilhadoModule,
    PdfManipulatorModule,
    MetaModule,
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
