import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import * as dotenv from 'dotenv';
import { ChildProcess } from 'child_process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  dotenv.config();
  await app.listen(process.env.PORT ?? 4000)
}
bootstrap()
