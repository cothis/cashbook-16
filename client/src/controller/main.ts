import { BaseState } from '@/store/store';
import Controller from '@/controller/controller';
import UserStore, { UserState } from '@/store/user';
import MenuStore, { MenuState } from '@/store/menu';

interface State {
  user: UserState;
  menu: MenuState;
}

class MainController extends Controller<State> {
  constructor() {
    super();
  }

  reduceFrom(key: keyof State) {
    let newState: BaseState;
    switch (key) {
      case 'user':
        newState = this.requestGetUser();
        break;
      case 'menu':
        newState = this.requestGetMenu();
        break;
    }

    return newState;
  }

  /** UserStore */
  requestSetUser(user: Partial<UserState>) {
    const result = UserStore.setState(user);
    if (result) this.notify('user');
  }

  requestGetUser() {
    return UserStore.getState();
  }

  /** MenuStore */
  requestSetMenu(menu: Partial<MenuState>) {
    const result = MenuStore.setState(menu);
    if (result) this.notify('menu');
  }

  requestGetMenu() {
    return MenuStore.getState();
  }
}

export default new MainController();
