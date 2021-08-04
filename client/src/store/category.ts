import Store, { BaseState } from './store';
import { PaymentCategory } from '../types';

export interface CategoryState extends BaseState {
  categories: PaymentCategory[];
}

class CategoryStore extends Store<CategoryState> {
  constructor(initialState?: CategoryState) {
    super(initialState);
  }
}

export default new CategoryStore();
