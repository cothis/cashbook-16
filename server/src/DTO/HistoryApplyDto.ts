export interface HistoryApplyDto {
  uuid?: number;
  githubId: string;
  content?: string;
  amount?: number;
  isIncome?: boolean;
  payDate?: Date;
  methodId?: number;
  methodName?: string;
  categoryName?: string;
}
