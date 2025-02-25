import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from '../controllers/app.controller'
import { AppService } from '../services/app.service'
import { ProductsModule } from './product.module'
import { AuthModule } from './auth.module'
import { UserModule } from './user.module'
import { PromotionModule } from './promotion.module'
import { DoctorModule } from './doctor.module'
import { productTypesModule } from './productType.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    UserModule,
    ProductsModule,
    productTypesModule,
    PromotionModule,
    DoctorModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbUrl = await new Promise((resolve) => {
          setTimeout(() => resolve(configService.get<string>('DATABASE_URL')), 100)
        })
        return { uri: dbUrl as string }
      },
      inject: [ConfigService]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {}
