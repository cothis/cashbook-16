import qs from 'qs';
import {
  PaymentCategory,
  PaymentHistory,
  PaymentMethod,
  HistoryProps,
} from '../types/index';

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
  option?: Partial<HistoryProps>
): Promise<PaymentHistory[]> => {
  return await request<PaymentHistory[]>(
    '/api/histories?' + qs.stringify(option)
  );
};

export const getMethods = async (): Promise<PaymentMethod[]> => {
  return await request<PaymentMethod[]>('/api/methods');
};

export const createHistory = async (body: any): Promise<PaymentHistory> => {
  return await request<PaymentHistory>('/api/histories', {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
