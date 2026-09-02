import { type RequestHandler } from 'express';
import { ProductService } from '../services/service.ts';
import type {
  CreateProductBody,
  ProductDeleteResponse,
  ProductIdParams,
  ProductListResponse,
  ProductQuery,
  ProductResponse,
  ProductUpdateResponse,
  UpdateProductBody,
} from '../types/http.types.ts';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  getAll: RequestHandler<
    Record<string, never>,
    ProductListResponse,
    Record<string, never>,
    ProductQuery
  > = (req, res, next) => {
    try {
      const products = this.productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  getById: RequestHandler<
    ProductIdParams,
    ProductResponse,
    Record<string, never>,
    Record<string, never>
  > = (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const product = this.productService.getProductById(id);
      res.status(200).json(product);
    } catch (error: unknown) {
      next(error);
    }
  };

  create: RequestHandler<
    Record<string, never>,
    ProductResponse,
    CreateProductBody,
    Record<string, never>
  > = (req, res, next) => {
    try {
      const product = this.productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  };

  update: RequestHandler<
    ProductIdParams,
    ProductUpdateResponse,
    UpdateProductBody,
    Record<string, never>
  > = (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const product = this.productService.updateProduct(id, req.body);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };

  delete: RequestHandler<
    ProductIdParams,
    ProductDeleteResponse,
    Record<string, never>,
    Record<string, never>
  > = (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const product = this.productService.deleteProduct(id);
      res.status(200).json({
        message: 'Produto deletado com sucesso.',
        product,
      });
    } catch (error) {
      next(error);
    }
  };
}
