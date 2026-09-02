import { Router } from 'express';
import { ProductController } from '../controllers/controller.ts';
import { ProductService } from '../services/service.ts';
import { ProductRepository } from '../repositories/repository.ts';
import { errorHandler } from '../middlewares/error-handler.middleware.ts';

const router = Router();
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.get('/products', productController.getAll);
router.get('/products/:id', productController.getById);
router.post('/products', productController.create);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.delete);

router.use(errorHandler);

export default router;
