import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configurationServer } from './config/server/configuration.server';

async function bootstrap() {
  await configurationServer();

  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const port = process.env.SERVER_PORT;

  await app.listen(port);
  logger.log(`🚀 Server started on port ${port}`);
}
bootstrap();
