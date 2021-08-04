type methodType = '카드' | '현금' | '현대카드';
type categoryType =
  | '식비'
  | '문화/여가'
  | '미분류'
  | '생활'
  | '의료/건강'
  | '교통';

type getHistoryPiece = {
  uuid: number;
  githubId: string;
  content: string;
  amount: '8000';
  isIncome: boolean;
  payDate: Date;
  methodId: number;
  categoryName: categoryType;
  method: {
    id: number;
    githubId: string;
    name: methodType;
  };
  category: {
    name: categoryType;
    color: string; // '#332299'
  };
};

export default methodType;
