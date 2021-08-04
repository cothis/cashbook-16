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
    this.requestGetHistory();
  }

  reduceFrom(key: keyof State) {
    let newState: BaseState;
    switch (key) {
      case 'history':
        newState = this.getHistories();
    }

    return newState;
  }

  getHistories(): HistoryState {
    return historyStore.getState();
  }

  setHistories = (histories: PaymentHistory[]) => {
    const result = historyStore.setState({ histories: histories });
    if (result) this.notify('history');
  };

  requestGetHistory = async () => {
    try {
      const response = await fetch('/api/histories', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('히스토리를 가져오지 못했습니다.');
      const data: PaymentHistory[] = await response.json();
      console.log(data);
      this.setHistories(data);
    } catch (e) {
      console.error(e.message);
    }
  };

  fetchHistory = async (options: Partial<getHistoryProps>) => {
    const response = await getHistories(options);

    this.setHistories(response);
  };
}

export default new HistoryController();
