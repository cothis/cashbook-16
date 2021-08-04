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
}

export default new CategoryController();
