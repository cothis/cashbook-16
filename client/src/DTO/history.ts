import { categoryType } from './category';
import { methodType } from './method';

type getHistoryPiece = {
  uuid: number;
  githubId: string;
  content: string;
  amount: string; // int로 파싱해줘야함
  isIncome: boolean;
  payDate: Date;
  methodId: number;
  categoryName: categoryType;
  method: {
    id: number;
    name: methodType;
  };
  category: {
    name: categoryType;
    color: string; // '#332299'
  };
};

export { getHistoryPiece };
