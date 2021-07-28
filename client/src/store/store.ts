import { cmpState } from '@/utils';
export interface BaseState {}

export default class Store<S extends BaseState = BaseState> {
  state: S;

  constructor(initialState?: S) {
    this.state = initialState ?? ({} as S);
  }

  getState() {
    return this.state;
  }

  /**
   * @returns 변경 됐으면 true, 그대로면 false
   */
  setState(newState: Partial<S>) {
    const nextState = { ...this.state, ...newState };
    if (cmpState(this.state, nextState)) {
      return false;
    }
    this.state = nextState;
    return true;
  }
}
