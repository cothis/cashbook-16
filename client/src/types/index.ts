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
  githubId: string;
  name: string;
}

export interface PaymentCategory {
  name: string;
  color: string;
}
