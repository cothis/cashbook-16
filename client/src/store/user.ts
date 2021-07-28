import Store, { BaseState } from '@/store/store';

export interface UserState extends BaseState {
  id: string;
  name: string;
}

class UserStore extends Store<UserState> {
  constructor(initialState?: UserState) {
    super(initialState);
  }
}

export default new UserStore({ id: '', name: '' });
