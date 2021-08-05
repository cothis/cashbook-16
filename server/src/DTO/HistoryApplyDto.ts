export interface HistoryApplyDto {
  payDate: string;
  datas: {
    githubId?: string;
    content: string;
    amount: number;
    isIncome: boolean;
    payDate: string;
    methodId?: number;
    methodName?: string;
    categoryName: string;
  }[];
}
