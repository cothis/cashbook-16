import Store, { BaseState } from './store';

export interface TimeState extends BaseState {
  year: number;
  month: number;
  date: number;
}

class TimeStore extends Store<TimeState> {
  constructor(initialState?: TimeState) {
    const today = new Date();
    super(
      initialState ?? {
        year: today.getFullYear(),
        month: today.getMonth(),
        date: today.getDate(),
      }
    );
  }
}

export default new TimeStore();
