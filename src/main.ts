import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from 'src/app/app.module';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // passa a aplicar automaticamente a validação em todas as possibilidades
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
