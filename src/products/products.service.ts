import { Injectable } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  create(product: Omit<Product, 'id'>) {
    this.products.push({ id: Date.now(), ...product });
  }

  update(id: number, updatedProduct: Omit<Product, 'id'>) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products[index] = { id, ...updatedProduct };
    }
  }

  remove(id: number) {
    this.products = this.products.filter((p) => p.id !== id);
  }
}
