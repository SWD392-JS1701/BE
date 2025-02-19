import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  dotenv.config();
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for my NestJS project')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(process.env.PORT ?? 4000)
}
bootstrap()
