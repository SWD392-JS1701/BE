import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderDetails, OrderDetailsSchema } from '../models/order-details.model';
import { OrderDetailsRepository } from '../repositories/order-details.repository';
import { OrderDetailsService } from '../services/order-details.service';
import { OrderDetailsController } from '../controllers/order-details.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: OrderDetails.name, schema: OrderDetailsSchema }])],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService, OrderDetailsRepository],
  exports: [OrderDetailsService],
})
export class OrderDetailsModule {}
