import Controller from './controller';
import { BaseState } from '../store/store';
import historyStore, { HistoryState } from '../store/history';
import { PaymentHistory } from '../types';
import { getHistories, getHistoryProps } from '@/api/histories';
import { getHistories as getHistoriesByApi } from '../api/apis';

interface State {
  history: HistoryState;
  isIncome?: boolean;
}

class HistoryController extends Controller<State> {
  constructor() {
    super();
  }

  reduceFrom(key: keyof State) {
    let newState: BaseState | undefined;
    switch (key) {
      case 'history':
        newState = this.getHistories();
      case 'isIncome':
        newState = this.getIsIncome();
    }

    return newState;
  }

  registerNewHistory(history: PaymentHistory) {
    this.getHistories().push(history);
    this.notify('history');
  }

  getIsIncome = () => {
    return historyStore.getState().isIncome;
  };

  setSearchOption = async (isIncome?: HistoryState['isIncome']) => {
    const histories = await getHistoriesByApi({ isIncome });
    historyStore.setState({ histories, isIncome });
    this.notify('history');
    this.notify('isIncome');
  };

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
