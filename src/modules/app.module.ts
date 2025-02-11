import { Module } from '@nestjs/common'
import { AppController } from '../controllers/app.controller'
import { AppService } from '../services/app.service'
import { ProductsModule } from './products.module'
import { AuthModule } from './auth.module'

@Module({
  imports: [ProductsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
