import { BaseState } from '../store/store';
import Controller from './controller';
import UserStore, { UserState } from '../store/user';
import MenuStore, { MenuState } from '../store/menu';

interface State {
  user: UserState;
  menu: MenuState;
}

class MainController extends Controller<State> {
  constructor() {
    super();
  }

  async reduceFrom(key: keyof State) {
    let newState: BaseState;
    switch (key) {
      case 'user':
        newState = await this.requestGetUser();
        break;
      case 'menu':
        newState = await this.requestGetMenu();
        break;
    }

    return newState;
  }

  /** UserStore */
  async requestSetUser(user: Partial<UserState>) {
    const result = UserStore.setState(user);
    if (result) this.notify('user');
  }

  async requestGetUser() {
    return UserStore.getState();
  }

  /** MenuStore */
  async requestSetMenu(menu: Partial<MenuState>) {
    const result = MenuStore.setState(menu);
    if (result) this.notify('menu');
  }

  async requestGetMenu() {
    return MenuStore.getState();
  }
}

export default new MainController();
