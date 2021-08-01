import historyService from './HistoryService';
import { createConnection, getConnection } from 'typeorm';
import { PaymentCategory } from '../entity/paymentCategory.entity';
import { PaymentMethod } from '../entity/paymentMethod.entity';

describe('historyService', () => {
  beforeAll(async () => {
    await createConnection();
    const category = PaymentCategory.create({ name: '식비', color: '#332299' });
    await PaymentCategory.save(category);
    const method = PaymentMethod.create({ name: '현대카드' });
    await PaymentMethod.save(method);
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it('getHistories 결과는 배열이어야 합니다.', async () => {
    const result = await historyService.getHistoires({});
    expect(result).toBeInstanceOf(Array);
  });

  it('createHistory 가 잘 동작해야 합니다.', async () => {
    const [category] = await PaymentCategory.find();
    const [method] = await PaymentMethod.find();
    if (!category) return;
    if (!method) return;

    const result = await historyService.createHistory({
      amount: 0,
      category,
      content: 'hi',
      githubId: 'cothis',
      isIncome: false,
      method,
      payDate: new Date(),
    });

    console.log(result);

    expect(result).toBeDefined();
  });
});
