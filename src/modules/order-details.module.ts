import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderDetails, OrderDetailsSchema } from '../models/order-details.model';
import { OrderDetailsRepository } from '../repositories/order-details.repository';
import { OrderDetailsService } from '../services/order-details.service';
import { OrderDetailsController } from '../controllers/order-details.controller';
import { Product, ProductSchema } from '../models/product.model';
import { ProductsService } from '../services/product.service';
import { ProductRepository } from '../repositories/product.repository';
import { ProductTypeRepository } from '../repositories/productType.repository';
import { ProductType, ProductTypeSchema } from '../models/productType.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderDetails.name, schema: OrderDetailsSchema },
      { name: Product.name, schema: ProductSchema },
      { name: ProductType.name, schema: ProductTypeSchema }
    ])
  ],
  controllers: [OrderDetailsController],
  providers: [
    OrderDetailsService, 
    OrderDetailsRepository,
    ProductsService,
    ProductRepository,
    ProductTypeRepository
  ],
  exports: [OrderDetailsService],
})
export class OrderDetailsModule {}
