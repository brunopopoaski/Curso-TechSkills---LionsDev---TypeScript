import { type NextFunction, type Request, type Response } from 'express';
import { ProductService } from '../services/service.ts';

export class ProductController {
  static getAll(req: Request, res: Response, next: NextFunction): void {
    try {
      const products = ProductService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static getById(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = Number(req.params.id);
      const product = ProductService.getProductById(id);
      res.status(200).json(product);
    } catch (error: unknown) {
      next(error);
    }
  }

  static create(req: Request, res: Response, next: NextFunction): void {
    try {
      const product = ProductService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  static update(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = Number(req.params.id);
      const product = ProductService.updateProduct(id, req.body);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static delete(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = Number(req.params.id);
      const product = ProductService.deleteProduct(id);
      res.status(200).json({
        message: 'Produto deletado com sucesso.',
        product,
      });
    } catch (error) {
      next(error);
    }
  }
}
