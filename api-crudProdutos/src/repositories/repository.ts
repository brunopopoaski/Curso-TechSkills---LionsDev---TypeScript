import { type IProduct } from '../utils/types.ts';
import { products } from '../utils/types.ts';

export class ProductRepository {
  getAll(): IProduct[] {
    return products;
  }

  findById(id: number): IProduct | undefined {
    return products.find((item) => item.id === id);
  }

  create(product: IProduct): IProduct {
    products.push(product);
    return product;
  }

  update(id: number, product: IProduct): IProduct {
    const productIndex = products.findIndex((item) => item.id === id);

    if (productIndex === -1) {
      throw new Error('Produto não encontrado.');
    }

    products[productIndex] = product;
    return products[productIndex];
  }

  delete(id: number): IProduct | undefined {
    const productIndex = products.findIndex((item) => item.id === id);

    if (productIndex === -1) {
      return undefined;
    }

    return products.splice(productIndex, 1)[0];
  }
}
