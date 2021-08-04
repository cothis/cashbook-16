import Controller from './controller';
import { BaseState } from '../store/store';
import historyStore, { HistoryState } from '../store/history';
import { PaymentHistory } from '../types';
import { getHistories, getHistoryProps } from '@/api/histories';

interface State {
  history: HistoryState;
}

class HistoryController extends Controller<State> {
  constructor() {
    super();
  }

  reduceFrom(key: keyof State) {
    let newState: BaseState;
    switch (key) {
      case 'history':
        newState = this.getHistories();
    }

    return newState;
  }

  getHistories(): PaymentHistory[] {
    return historyStore.getState().histories;
  }

  setHistories = (histories: PaymentHistory[]) => {
    const result = historyStore.setState({ histories: histories });
    if (result) this.notify('history');
  };

  fetchHistory = async (options: Partial<getHistoryProps>) => {
    const response = await getHistories(options);

    this.setHistories(response);
  };

  getHistoryOfDate = (query: Date) => {
    return historyStore.getState().histories.filter((history) => {
      history.payDate.setHours(0, 0, 0, 0);
      query.setHours(0, 0, 0, 0);
      if (history.payDate.getTime() == query.getTime()) return true;
      return false;
    });
  };
}

export default new HistoryController();
