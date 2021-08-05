import Controller from './controller';
import { BaseState } from '../store/store';
import CategoryStore, { CategoryState } from '../store/category';
import MethodStore, { MethodState } from '../store/method';
import { PaymentCategory, PaymentMethod } from '../types';

interface State {
  category: CategoryState;
  method: MethodState;
}

class ListController extends Controller<State> {
  constructor() {
    super();
  }

  reduceFrom(key: keyof State) {
    let newState: BaseState;
    switch (key) {
      case 'category':
        newState = this.getCategories();
        break;
      case 'method':
        newState = this.getMethods();
        break;
    }

    return newState;
  }

  getMethods = (): PaymentMethod[] => {
    return MethodStore.getState().methods;
  };

  setMethods = (methods: PaymentMethod[]) => {
    const result = MethodStore.setState({ methods });
    if (result) this.notify('method');
  };

  getCategories(): PaymentCategory[] {
    return CategoryStore.getState().categories;
  }

  setCategories = (categories: PaymentCategory[]) => {
    const result = CategoryStore.setState({ categories });
    if (result) this.notify('category');
  };
}

export default new ListController();
