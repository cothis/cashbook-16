import { BaseState } from './store';

export interface UserState extends BaseState {
  id: string;
  name: string;
}

class UserStore {
  private state: UserState;

  constructor() {
    this.state = { id: '', name: '' };
  }

  getUser = (): Promise<UserState> => {
    return new Promise((resolve) => setTimeout(() => resolve(this.state), 300));
  };

  setUser = (user: Partial<UserState>): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        this.state = { ...this.state, ...user };
        resolve(true);
      }, 500);
    });
  };
}

export default new UserStore();
