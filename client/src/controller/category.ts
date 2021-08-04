import Controller from './controller';
import { BaseState } from '../store/store';
import CategoryStore, { CategoryState } from '../store/category';
import { PaymentCategory } from '../types';

interface State {
  category: CategoryState;
}

class CategoryController extends Controller<State> {
  constructor() {
    super();
  }

  reduceFrom(key: keyof State) {
    let newState: BaseState;
    switch (key) {
      case 'category':
        newState = this.getCategories();
    }

    return newState;
  }

  getCategories(): PaymentCategory[] {
    return CategoryStore.getState().categories;
  }

  setCategories = (categories: PaymentCategory[]) => {
    const result = CategoryStore.setState({ categories: categories });
    if (result) this.notify('category');
  };

  requestGetCategory = async () => {
    try {
      const response = await fetch('/api/categories', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('히스토리를 가져오지 못했습니다.');
      const data: PaymentCategory[] = await response.json();
      console.log(data);
      this.setCategories(data);
    } catch (e) {
      console.error(e.message);
    }
  };
}

export default new CategoryController();
