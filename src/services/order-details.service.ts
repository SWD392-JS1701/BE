import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrderDetailsRepository } from '../repositories/order-details.repository';
import { CreateOrderDetailsDto, UpdateOrderDetailsDto } from '../dtos/order-details.dto';
import { OrderDetails } from '../models/order-details.model';
import { ProductsService } from '../services/product.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../models/product.model';

@Injectable()
export class OrderDetailsService {
  constructor(
    private readonly orderDetailsRepository: OrderDetailsRepository,
    private readonly productsService: ProductsService,
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async createOrderDetails(createOrderDetailsDto: CreateOrderDetailsDto): Promise<OrderDetails> {
    // Validate and update stock for each product
    for (const product of createOrderDetailsDto.product_List) {
      const productInDb = await this.productModel.findById(product.product_Id);
      if (!productInDb) {
        throw new NotFoundException(`Product ${product.product_Id} not found`);
      }
      
      // Check if enough stock is available
      if (productInDb.stock < product.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product ${product.name}. Available: ${productInDb.stock}, Requested: ${product.quantity}`
        );
      }

      // Update product stock
      await this.productModel.findByIdAndUpdate(
        product.product_Id,
        { $inc: { stock: -product.quantity } }
      );
    }

    // Create order details after stock validation and update
    return this.orderDetailsRepository.create(createOrderDetailsDto);
  }

  async getAllOrderDetails(): Promise<OrderDetails[]> {
    return this.orderDetailsRepository.findAll();
  }

  async getOrderDetailsById(id: string): Promise<OrderDetails> {
    const orderDetails = await this.orderDetailsRepository.findById(id);
    if (!orderDetails) {
      throw new NotFoundException('Order Details not found');
    }
    return orderDetails;
  }

  async getOrderDetailsByOrderId(orderId: string): Promise<{ orderDetails: OrderDetails[] }> {
    const orderDetails = await this.orderDetailsRepository.findByOrderId(orderId);
    return { orderDetails };
  }

  async updateOrderDetails(id: string, updateOrderDetailsDto: UpdateOrderDetailsDto): Promise<OrderDetails> {
    const currentOrderDetails = await this.orderDetailsRepository.findById(id);
    if (!currentOrderDetails) {
      throw new NotFoundException('Order Details not found');
    }

    // If updating product quantities, adjust stock accordingly
    if (updateOrderDetailsDto.product_List) {
      for (const newProduct of updateOrderDetailsDto.product_List) {
        const oldProduct = currentOrderDetails.product_List.find(p => p.product_Id === newProduct.product_Id);
        const quantityDiff = oldProduct ? newProduct.quantity - oldProduct.quantity : newProduct.quantity;
        
        if (quantityDiff !== 0) {
          const productInDb = await this.productModel.findById(newProduct.product_Id);
          if (!productInDb) {
            throw new NotFoundException(`Product ${newProduct.product_Id} not found`);
          }

          // Check if enough stock is available for increase
          if (quantityDiff > 0 && productInDb.stock < quantityDiff) {
            throw new BadRequestException(
              `Insufficient stock for product ${newProduct.name}. Available: ${productInDb.stock}, Additional requested: ${quantityDiff}`
            );
          }

          // Update product stock
          await this.productModel.findByIdAndUpdate(
            newProduct.product_Id,
            { $inc: { stock: -quantityDiff } }
          );
        }
      }
    }

    const updatedOrderDetails = await this.orderDetailsRepository.update(id, updateOrderDetailsDto);
    if (!updatedOrderDetails) {
      throw new NotFoundException('Order Details not found');
    }
    return updatedOrderDetails;
  }

  async deleteOrderDetails(id: string): Promise<OrderDetails> {
    const orderDetails = await this.orderDetailsRepository.findById(id);
    if (!orderDetails) {
      throw new NotFoundException('Order Details not found');
    }

    // Restore product stock when order details are deleted
    for (const product of orderDetails.product_List) {
      await this.productModel.findByIdAndUpdate(
        product.product_Id,
        { $inc: { stock: product.quantity } }
      );
    }

    const deletedOrderDetails = await this.orderDetailsRepository.delete(id);
    if (!deletedOrderDetails) {
      throw new NotFoundException('Order Details not found');
    }
    return deletedOrderDetails;
  }
}
