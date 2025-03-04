import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductTypesController } from '~/controllers/productType.controller'
import { ProductType, ProductTypeSchema } from '~/models/productType.model'
import { ProductTypeRepository } from '~/repositories/productType.repository'
import { ProductTypesService } from '~/services/productType.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: ProductType.name, schema: ProductTypeSchema }])],
  controllers: [ProductTypesController],
  providers: [ProductTypesService, ProductTypeRepository],
  exports: [ProductTypeRepository]
})
export class productTypesModule {}
