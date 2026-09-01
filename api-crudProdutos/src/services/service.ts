import { type IProduct, type ProductInput, type ProductUpdate, products } from '../utils/types.ts';
import { ProductUtils } from '../utils/productUtils.ts';
import { AppError } from '../errors/app.error.ts';

export class ProductService {
  static getAllProducts(): IProduct[] {
    return products;
  }

  static getProductById(id: number): IProduct {
    if (Number.isNaN(id)) {
      throw new AppError('ID inválido.', 400);
    }

    const product = products.find((item) => item.id === id);

    if (!product) {
      throw new AppError('Produto não encontrado.', 404);
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
    if (Number.isNaN(id)) {
      throw new AppError('ID inválido.', 400);
    }

    const productIndex = products.findIndex((item) => item.id === id);

    if (productIndex === -1) {
      throw new AppError('Produto não encontrado.', 404);
    }

    const currentProduct = products[productIndex];

    if (!currentProduct) {
      throw new AppError('Produto não encontrado.', 404);
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
    if (Number.isNaN(id)) {
      throw new AppError('ID inválido.', 400);
    }

    const productIndex = products.findIndex((item) => item.id === id);

    if (productIndex === -1) {
      throw new AppError('Produto não encontrado.', 404);
    }

    const deletedProduct = products.splice(productIndex, 1)[0];

    if (!deletedProduct) {
      throw new AppError('Produto não encontrado.', 404);
    }

    return deletedProduct;
  }
}
