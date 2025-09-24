import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 5000);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableShutdownHooks();
  console.log('Server listening on', process.env.PORT || 5000);
  app.enableShutdownHooks();
  // optionally listen to ctrl+c and close resources
  process.on('SIGINT', async () => {
    await app.close();
    process.exit(0);
  });
}
bootstrap();

