import { methodType } from '../DTO/method';
import { getHistoryPiece } from '../DTO/history';
import qs from 'qs';

interface getHistoryProps {
  category: string;
  isIncome: boolean;
  startDate: Date;
  endDate: Date;
  method: methodType;
}

const getHistories = async (prop: Partial<getHistoryProps>) => {
  const response = await fetch('/api/histories?' + qs.stringify(prop), {
    credentials: 'include',
  })
    .then((res) => {
      if (res.status > 400) {
        console.log('failed to GET /api/histories');
      }
      return res;
    })
    .then((res) => res.json());

  return response as getHistoryPiece[];
};

export { getHistories, getHistoryProps };
