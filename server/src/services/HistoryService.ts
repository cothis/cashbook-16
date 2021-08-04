import { PaymentHistory } from '../entity/paymentHistory.entity';
import { HistoryQuery } from '../controllers/historyController';
import { Between } from 'typeorm';

class HistoryService {
  constructor() {}

  getHistoires = async (query: HistoryQuery): Promise<PaymentHistory[]> => {
    const condition = {
      ...(query.githubId && { githubId: query.githubId }),
      ...(query.category && { category: { name: query.category } }),
      ...(query.method && { method: { id: query.method } }),
      ...(query.isIncome && { isIncome: query.isIncome == 'true' }),
      ...(query.startDate &&
        query.endDate && { payDate: Between(query.startDate, query.endDate) }),
    };

    const histories = await PaymentHistory.find({
      where: condition,
      relations: ['method', 'category'],
    });

    return histories;
  };

  getHistoryById = async (uuid: number): Promise<PaymentHistory> => {
    return await PaymentHistory.findOneOrFail({
      where: {
        uuid,
      },
    });
  };

  createHistory = async (
    history: Partial<PaymentHistory>
  ): Promise<PaymentHistory> => {
    console.log(history);
    const newHistory = PaymentHistory.create({
      ...history,
      method: { id: history.methodId },
      category: { name: history.categoryName },
    });
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
