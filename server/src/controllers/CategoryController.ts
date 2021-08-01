import { PaymentCategory } from '@/entity/paymentCategory.entity';
import { Request, Response } from 'express';
import categoryService from '../services/CategoryService';

class CategoryController {
  constructor() {}

  getCategories = async (req: Request, res: Response) => {
    const categories: PaymentCategory[] = await categoryService.getCategories();

    res.json(categories);
  };
}

export default new CategoryController();
