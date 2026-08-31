import { type IProduct, type ProductInput, type ProductUpdate } from './types';

export class ProductUtils {
  static nextId(products: IProduct[]): number {
    if (products.length === 0) {
      return 1;
    }

    return Math.max(...products.map((product) => product.id)) + 1;
  }

  static validateProduct(product: ProductInput | IProduct): void {
    if (!product.name || product.name.trim().length < 3) {
      throw new Error('O nome do produto deve ter pelo menos 3 caracteres.');
    }

    if (!product.description || product.description.trim().length < 5) {
      throw new Error('A descrição do produto deve ter pelo menos 5 caracteres.');
    }

    if (product.price <= 0) {
      throw new Error('O preço do produto deve ser maior que zero.');
    }

    if (product.stock < 0) {
      throw new Error('O estoque do produto não pode ser negativo.');
    }

    if (!product.category || product.category.trim().length < 2) {
      throw new Error('A categoria do produto é inválida.');
    }
  }

  static validatePartialUpdate(productData: ProductUpdate): void {
    if (!productData || Object.keys(productData).length === 0) {
      throw new Error('Informe ao menos um campo para atualizar.');
    }

    if (productData.name !== undefined && productData.name.trim().length < 3) {
      throw new Error('O nome do produto deve ter pelo menos 3 caracteres.');
    }

    if (productData.description !== undefined && productData.description.trim().length < 5) {
      throw new Error('A descrição do produto deve ter pelo menos 5 caracteres.');
    }

    if (productData.price !== undefined && productData.price <= 0) {
      throw new Error('O preço do produto deve ser maior que zero.');
    }

    if (productData.stock !== undefined && productData.stock < 0) {
      throw new Error('O estoque do produto não pode ser negativo.');
    }

    if (productData.category !== undefined && productData.category.trim().length < 2) {
      throw new Error('A categoria do produto é inválida.');
    }
  }
}
