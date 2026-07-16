import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Habilita o CORS para permitir requisições de diferentes origens
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
