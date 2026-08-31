import { type IProduct, type ProductInput, type ProductUpdate, products } from '../utils/types.ts';
import { ProductUtils } from '../utils/productUtils.ts';

export class ProductService {
  static getAllProducts(): IProduct[] {
    return products;
  }

  static getProductById(id: number): IProduct {
    const product = products.find((item) => item.id === id);

    if (!product) {
      throw new Error('Produto não encontrado.');
    }

    return product;
  }

  static createProduct(productData: ProductInput): IProduct {
    ProductUtils.validateProduct(productData);

    const newProduct: IProduct = {
      id: ProductUtils.nextId(products),
      ...productData,
    };

    products.push(newProduct);
    return newProduct;
  }

  static updateProduct(id: number, productData: ProductUpdate): IProduct {
    const productIndex = products.findIndex((item) => item.id === id);

    if (productIndex === -1) {
      throw new Error('Produto não encontrado.');
    }

    const currentProduct = products[productIndex];

    if (!currentProduct) {
      throw new Error('Produto não encontrado.');
    }

    ProductUtils.validatePartialUpdate(productData);

    const updatedProduct: IProduct = {
      ...currentProduct,
      ...productData,
    };

    ProductUtils.validateProduct(updatedProduct);
    products[productIndex] = updatedProduct;

    return products[productIndex];
  }

  static deleteProduct(id: number): IProduct {
    const productIndex = products.findIndex((item) => item.id === id);

    if (productIndex === -1) {
      throw new Error('Produto não encontrado.');
    }

    const deletedProduct = products.splice(productIndex, 1)[0];

    if (!deletedProduct) {
      throw new Error('Produto não encontrado.');
    }

    return deletedProduct;
  }
}
