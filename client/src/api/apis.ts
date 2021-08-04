import qs from 'qs';
import { PaymentCategory, PaymentHistory, PaymentMethod } from '../types/index';

interface getHistoryProps {
  category: string;
  isIncome: boolean;
  startDate: Date;
  endDate: Date;
  method: PaymentMethod;
}

const request = async <T>(
  url: string,
  option: RequestInit = {},
  errorMessage?: string
): Promise<T> => {
  const response = await fetch(url, { ...option, credentials: 'include' });
  if (!response.ok)
    throw new Error(errorMessage ?? 'fetch 요청에 실패했습니다.');
  return (await response.json()) as T;
};

export const getCategories = async (): Promise<PaymentCategory[]> => {
  return await request<PaymentCategory[]>('/api/categories');
};

export const getHistories = async (
  option?: Partial<getHistoryProps>
): Promise<PaymentHistory[]> => {
  return await request<PaymentHistory[]>(
    '/api/histories?' + qs.stringify(option)
  );
};

export const getMethods = async (): Promise<PaymentMethod[]> => {
  return await request<PaymentMethod[]>('/api/methods');
};

export const createHistory = async (body: string): Promise<PaymentHistory> => {
  return await request<PaymentHistory>('/api/histories', {
    method: 'post',
    body: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};
