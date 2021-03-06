import Store, { BaseState } from './store';
import { PaymentHistory } from '../types';

export interface HistoryState extends BaseState {
  histories: PaymentHistory[];
  isIncome?: boolean;
}

class HistoryStore extends Store<HistoryState> {
  constructor(initialState?: HistoryState) {
    super(initialState);
  }
}

export default new HistoryStore();
