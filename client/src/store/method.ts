import Store, { BaseState } from './store';
import { PaymentMethod } from '../types';

export interface MethodState extends BaseState {
  methods: PaymentMethod[];
}

class MethodStore extends Store<MethodState> {
  constructor(initialState?: MethodState) {
    super(initialState);
  }
}

export default new MethodStore();
