import { BaseState } from './store';

export interface MenuState extends BaseState {
  current: string;
}

class MenuStore {
  private state: MenuState;

  constructor() {
    this.state = { current: 'default' };
  }

  getMenu = (): Promise<MenuState> => {
    return new Promise((resolve) => setTimeout(() => resolve(this.state), 300));
  };

  setMenu = (menu: Partial<MenuState>): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        this.state = { ...this.state, ...menu };
        resolve(true);
      }, 500);
    });
  };
}

export default new MenuStore();
