import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import * as dotenv from 'dotenv'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  dotenv.config()
  const config = new DocumentBuilder()
    .setTitle('LumièreSkin')
    .setDescription('SWP392 Final Project')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  app.enableCors({
    origin: '*'
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )

  await app.listen(process.env.PORT ?? 4000)
}
void bootstrap()
