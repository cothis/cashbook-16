import Store, { BaseState } from './store';

export interface MenuState extends BaseState {
  current: string;
}

class MenuStore extends Store<MenuState> {
  constructor(initialState?: MenuState) {
    super(initialState);
  }
}

export default new MenuStore();
