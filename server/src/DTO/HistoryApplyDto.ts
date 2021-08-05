export interface HistoryApplyDto {
  payDate: string;
  datas: {
    githubId?: string;
    content: string;
    amount: number;
    isIncome: boolean;
    payDate: Date;
    methodId?: number;
    methodName?: string;
    categoryName: string;
  }[];
}
