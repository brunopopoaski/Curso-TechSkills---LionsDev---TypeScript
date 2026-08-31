import { Router } from 'express';
import { ProductController } from '../controllers/controller';

const router = Router();

router.get('/products', ProductController.getAll);
router.get('/products/:id', ProductController.getById);
router.post('/products', ProductController.create);
router.put('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.delete);

export default router;
