import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductsService, Product } from './products.service'; // Import Product

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Product[] {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Product | undefined {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() product: Omit<Product, 'id'>): void {
    this.productsService.create(product);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() product: Omit<Product, 'id'>): void {
    this.productsService.update(id, product);
  }

  @Delete(':id')
  remove(@Param('id') id: number): void {
    this.productsService.remove(id);
  }
}
