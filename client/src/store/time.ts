import Store, { BaseState } from './store';

export interface CalendarState extends BaseState {
  year: number;
  month: number;
  date: number;
}

class CalendarStore extends Store<CalendarState> {
  constructor(initialState?: CalendarState) {
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

export default new CalendarStore();
