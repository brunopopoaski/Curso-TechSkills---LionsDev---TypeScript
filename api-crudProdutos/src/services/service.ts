import { type IProduct, type ProductInput, type ProductUpdate } from '../utils/types.ts';
import { ProductUtils } from '../utils/productUtils.ts';
import { ProductRepository } from '../repositories/repository.ts';
import { AppError } from '../errors/app.error.ts';

export class ProductService {
  private readonly productUtils: ProductUtils;

  constructor(private readonly productRepository: ProductRepository) {
    this.productUtils = new ProductUtils();
  }

  getAllProducts(): IProduct[] {
    return this.productRepository.getAll();
  }

  getProductById(id: number): IProduct {
    if (Number.isNaN(id)) {
      throw new AppError('ID inválido.', 400);
    }

    const product: IProduct | undefined = this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Produto não encontrado.', 404);
    }

    return product;
  }

  createProduct(productData: ProductInput): IProduct {
    this.productUtils.validateProduct(productData);

    const newProduct: IProduct = {
      id: this.productUtils.nextId(this.productRepository.getAll()),
      ...productData,
    };

    return this.productRepository.create(newProduct);
  }

  updateProduct(id: number, productData: ProductUpdate): IProduct {
    if (Number.isNaN(id)) {
      throw new AppError('ID inválido.', 400);
    }

    const currentProduct = this.productRepository.findById(id);

    if (!currentProduct) {
      throw new AppError('Produto não encontrado.', 404);
    }

    this.productUtils.validatePartialUpdate(productData);

    const updatedProduct: IProduct = {
      ...currentProduct,
      ...productData,
    };

    this.productUtils.validateProduct(updatedProduct);

    return this.productRepository.update(id, updatedProduct);
  }

  deleteProduct(id: number): IProduct {
    if (Number.isNaN(id)) {
      throw new AppError('ID inválido.', 400);
    }

    const deletedProduct = this.productRepository.delete(id);

    if (!deletedProduct) {
      throw new AppError('Produto não encontrado.', 404);
    }

    return deletedProduct;
  }
}
