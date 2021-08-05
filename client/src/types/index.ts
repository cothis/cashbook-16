export interface PaymentHistory {
  uuid: number;
  githubId: string;
  content: string;
  amount: string;
  isIncome: boolean;
  payDate: Date;
  method: PaymentMethod;
  category: PaymentCategory;
}

export interface PaymentMethod {
  id: number;
  name: string;
}

export interface PaymentCategory {
  name: string;
  color: string;
}

export interface HistoryProps {
  category: string;
  isIncome: boolean;
  startDate: Date;
  endDate: Date;
  method: PaymentMethod;
}
