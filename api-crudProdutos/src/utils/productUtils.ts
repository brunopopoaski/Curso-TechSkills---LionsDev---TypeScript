import { type IProduct, type ProductInput, type ProductUpdate } from './types.ts';
import { AppError } from '../errors/app.error.ts';

export class ProductUtils {
  nextId(products: IProduct[]): number {
    if (products.length === 0) {
      return 1;
    }

    return Math.max(...products.map((product) => product.id)) + 1;
  }

  validateProduct(product: ProductInput | IProduct): void {
    if (!product.name || product.name.trim().length < 3) {
      throw new AppError('O nome do produto deve ter pelo menos 3 caracteres.', 400);
    }

    if (!product.description || product.description.trim().length < 5) {
      throw new AppError('A descrição do produto deve ter pelo menos 5 caracteres.', 400);
    }

    if (product.price <= 0) {
      throw new AppError('O preço do produto deve ser maior que zero.', 400);
    }

    if (product.stock < 0) {
      throw new AppError('O estoque do produto não pode ser negativo.', 400);
    }

    if (!product.category || product.category.trim().length < 2) {
      throw new AppError('A categoria do produto é inválida.', 400);
    }
  }

  validatePartialUpdate(productData: ProductUpdate): void {
    if (!productData || Object.keys(productData).length === 0) {
      throw new AppError('Informe ao menos um campo para atualizar.', 400);
    }

    if (productData.name !== undefined && productData.name.trim().length < 3) {
      throw new AppError('O nome do produto deve ter pelo menos 3 caracteres.', 400);
    }

    if (productData.description !== undefined && productData.description.trim().length < 5) {
      throw new AppError('A descrição do produto deve ter pelo menos 5 caracteres.', 400);
    }

    if (productData.price !== undefined && productData.price <= 0) {
      throw new AppError('O preço do produto deve ser maior que zero.', 400);
    }

    if (productData.stock !== undefined && productData.stock < 0) {
      throw new AppError('O estoque do produto não pode ser negativo.', 400);
    }

    if (productData.category !== undefined && productData.category.trim().length < 2) {
      throw new AppError('A categoria do produto é inválida.', 400);
    }
  }
}