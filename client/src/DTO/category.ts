type categoryType =
  | '식비'
  | '문화/여가'
  | '미분류'
  | '생활'
  | '의료/건강'
  | '교통';

type categoryPostForm = {
  categoryName: string;
  content: string;
  method: string;
  amount: number;
  isIncome?: boolean;
  uuid?: number;
  payDate?: string;
};

export { categoryType, categoryPostForm };
