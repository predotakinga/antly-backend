import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Ant.ly')
    .setDescription('The ant.ly API description')
    .setVersion('1.0')
    .addTag('ant.ly')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.use(cookieParser());

  const port = process.env.PORT || 3000;
  await app.listen(port, () => console.log("listening on port 3000"));
}
bootstrap();
