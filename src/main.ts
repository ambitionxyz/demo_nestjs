import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
  });
  app.use(cookieParser());

  const port = process.env.PORT || 3000;
  console.log('port: ' + port);
  await app.listen(port);
}
bootstrap();
