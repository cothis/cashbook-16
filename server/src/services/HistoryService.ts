import { PaymentHistory } from '../entity/paymentHistory.entity';
import { HistoryQuery } from '../controllers/historyController';
import { Between, getConnection } from 'typeorm';
import { PaymentMethod } from '../entity/paymentMethod.entity';
import { PaymentCategory } from '../entity/paymentCategory.entity';

class HistoryService {
  deleteHistories = async (payDate: string, githubId: string) => {
    getConnection()
      .createQueryBuilder()
      .delete()
      .from(PaymentHistory)
      .where('DATE(payDate) = DATE(:payDate)', { payDate: new Date(payDate) })
      .andWhere('githubId = :githubId', { githubId })
      .execute();
  };

  createHistories = async (
    datas: Partial<PaymentHistory>[],
    githubId: string
  ) => {
    console.log(datas);
    datas.forEach((history) => {
      history.githubId = githubId;
      this.createHistory(history);
    });
  };

  applyChanges = async (
    histories: Partial<PaymentHistory>[],
    githubId: string
  ): Promise<boolean> => {
    const updates = histories.filter((history) => history.uuid);
    const news = histories.filter((history) => !history.uuid);
    news.forEach((history) => (history.githubId = githubId));

    const results = await Promise.all<boolean | PaymentHistory>([
      ...updates.map(this.updateHistory),
      ...news.map(this.createHistory),
    ]);

    return true;
  };
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
      order: {
        payDate: 'DESC',
      },
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
    const newHistory = PaymentHistory.create({
      ...history,
      method: { id: history.methodId },
      category: { name: history.categoryName },
    });
    const result = await PaymentHistory.save(newHistory);
    result.method = await PaymentMethod.findOneOrFail(result.methodId);
    result.category = await PaymentCategory.findOneOrFail(result.categoryName);

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
