import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: ['log', 'error', 'warn', 'debug'],
    }
  );
  app.useGlobalPipes(
    new ValidationPipe(),
    // ...
  );
  await app.listen(3000, '0.0.0.0');
}

bootstrap();
