import { PaymentHistory } from '../entity/paymentHistory.entity';
import { NextFunction, Request, Response } from 'express';
import historyService from '../services/HistoryService';

export interface HistoryQuery {
  githubId?: string;
  category?: number;
  isIncome?: string;
  startDate?: Date;
  endDate?: Date;
  method?: string;
}

class HistoryController {
  constructor() {}

  getHistories = async (req: Request, res: Response) => {
    const query: HistoryQuery = req.query;
    query.githubId = req.session.githubId;
    const histories: PaymentHistory[] = await historyService.getHistoires(
      query
    );

    res.json(histories);
  };

  createHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const history: Partial<PaymentHistory> = req.body;
      console.log(history);
      history.githubId = req.session.githubId;
      const newHistory = await historyService.createHistory(history);

      res.json(newHistory);
    } catch (err) {
      next(err);
    }
  };

  updateHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const historyId = Number(req.params.historyId);
      const history: Partial<PaymentHistory> = req.body;
      history.uuid = historyId;
      const updateResult: boolean = await historyService.updateHistory(history);

      res.json({ result: updateResult });
    } catch (err) {
      next(err);
    }
  };

  deleteHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const historyId = Number(req.params.historyId);
      const deleteResult: boolean = await historyService.deleteHistory(
        historyId
      );

      res.json({ result: deleteResult });
    } catch (err) {
      next(err);
    }
  };
}

export default new HistoryController();
