import express from 'express';
import categoryController from '../controllers/CategoryController';

const router = express.Router();

router.get('/', categoryController.getCategories);

export default router;
