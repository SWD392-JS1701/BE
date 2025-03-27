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
import { ScheduleModule } from './schedule.module'
import { MembershipModule } from './membership.module'
import { BlogModule } from './blog.module'
import { FaqModule } from './faq.module'
import { ComboModule } from './combo.module'
import { OrderModule } from './order.module'
import { OrderDetailsModule } from './order-details.module'
import { QuizModule } from './quiz.module'
import { QuestionModule } from './question.module'
import { BookingModule } from './booking.module'
import { PromotedProductModule } from './promotedProduct.module'
import { RatingModule } from './rating.module'
import { PaymentModule } from './payment.module'
import { GeminiModule } from './gemini.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    UserModule,
    ProductsModule,
    productTypesModule,
    RatingModule,
    PromotionModule,
    PromotedProductModule,
    DoctorModule,
    ScheduleModule,
    MembershipModule,
    BlogModule,
    FaqModule,
    ComboModule,
    OrderModule,
    OrderDetailsModule,
    QuizModule,
    QuestionModule,
    BookingModule,
    PaymentModule,
    GeminiModule,
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
