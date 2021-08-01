import { PaymentHistory } from '../entity/paymentHistory.entity';
import { HistoryQuery } from '../controllers/historyController';
import { Between, DeepPartial } from 'typeorm';

class HistoryService {
  constructor() {}

  getHistoires = async (query: HistoryQuery): Promise<PaymentHistory[]> => {
    const histories = await PaymentHistory.find({
      where: {
        githubId: query.githubId,
        category: query.category,
        isIncome: query.isIncome,
        payDate: Between(query.startDate, query.endDate),
        method: query.method,
      },
    });

    return histories;
  };

  createHistory = async (
    history: Partial<PaymentHistory>
  ): Promise<PaymentHistory> => {
    const newHistory = PaymentHistory.create(history);
    const result = await PaymentHistory.save(newHistory);

    return result;
  };

  updateHistory = async (
    history: Partial<PaymentHistory>
  ): Promise<boolean> => {
    const result = await PaymentHistory.update({ uuid: history.uuid }, history);

    return (result.affected ?? 0) > 0;
  };

  deleteHistory = async (historyId: number): Promise<boolean> => {
    const result = await PaymentHistory.delete({ uuid: historyId });

    return (result.affected ?? 0) > 0;
  };
}

export default new HistoryService();
