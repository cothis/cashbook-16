import { PaymentCategory } from '@/entity/paymentCategory.entity';

class CategoryService {
  constructor() {}

  getCategories = async (): Promise<PaymentCategory[]> => {
    const categories = await PaymentCategory.find();

    return categories;
  };
}

export default new CategoryService();
