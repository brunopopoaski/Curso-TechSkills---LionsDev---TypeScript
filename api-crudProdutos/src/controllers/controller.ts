import { type Request, type Response } from 'express';
import { ProductService } from '../services/service.ts';

export class ProductController {
  static getAll(req: Request, res: Response): void {
    try {
      const products = ProductService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao buscar produtos.';
      res.status(400).json({ message });
    }
  }

  static getById(req: Request, res: Response): void {
    try {
      const id = Number(req.params.id);
      const product = ProductService.getProductById(id);
      res.status(200).json(product);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao buscar produto.';
      res.status(404).json({ message });
    }
  }

  static create(req: Request, res: Response): void {
    try {
      const product = ProductService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao criar produto.';
      res.status(400).json({ message });
    }
  }

  static update(req: Request, res: Response): void {
    try {
      const id = Number(req.params.id);
      const product = ProductService.updateProduct(id, req.body);
      res.status(200).json(product);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao atualizar produto.';
      const statusCode = message === 'Produto não encontrado.' ? 404 : 400;
      res.status(statusCode).json({ message });
    }
  }

  static delete(req: Request, res: Response): void {
    try {
      const id = Number(req.params.id);
      const product = ProductService.deleteProduct(id);
      res.status(200).json({
        message: 'Produto deletado com sucesso.',
        product,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao deletar produto.';
      const statusCode = message === 'Produto não encontrado.' ? 404 : 400;
      res.status(statusCode).json({ message });
    }
  }
}
