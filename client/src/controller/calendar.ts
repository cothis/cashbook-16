import Controller from './controller';
import { BaseState } from '../store/store';
import TimeStore, { TimeState } from '../store/time';

interface State {
  time: TimeState;
}

class CalendarController extends Controller<State> {
  constructor() {
    super();
  }

  reduceFrom(key: keyof State) {
    let newState: BaseState;
    switch (key) {
      case 'time':
        newState = this.getCalendar();
    }

    return newState;
  }

  getCalendar(): TimeState {
    return TimeStore.getState();
  }

  setCalendar = (calendar: TimeState) => {
    const result = TimeStore.setState(calendar);
    if (result) this.notify('time');
  };
}

export default new CalendarController();
