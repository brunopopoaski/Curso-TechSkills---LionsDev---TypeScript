import { Router } from 'express';
import { ProductController } from '../controllers/controller.ts';
import { errorHandler } from '../middlewares/error-handler.middleware.ts';

const router = Router();

router.get('/products', ProductController.getAll);
router.get('/products/:id', ProductController.getById);
router.post('/products', ProductController.create);
router.put('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.delete);

router.use(errorHandler);

export default router;
