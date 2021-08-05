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
        break;
      case 'isIncome':
        newState = this.getIsIncome();
        break;
    }

    return newState;
  }

  registerNewHistory(history: PaymentHistory) {
    this.getHistories().push(history);
    this.getHistories().sort(
      (a, b) =>
        new Date(a.payDate).getSeconds() - new Date(b.payDate).getSeconds()
    );
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
}

export default new HistoryController();
