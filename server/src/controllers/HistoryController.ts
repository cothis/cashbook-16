import { PaymentHistory } from '@/entity/paymentHistory.entity';
import { Request, Response } from 'express';
import historyService from '../services/HistoryService';

export interface historyQuery {
  githubId?: string;
  category?: number;
  isIncome?: boolean;
  startDate?: Date;
  endDate?: Date;
  method?: string;
}

class historyController {
  constructor() {}

  getHistories = (req: Request, res: Response) => {
    const query: historyQuery = req.query;
    query.githubId = req.session.githubId;
    const histories: PaymentHistory[] = historyService.getHistoires(query);

    res.json(histories);
  };

  createHistory = (req: Request, res: Response) => {
    const history: PaymentHistory = req.body;
    const newHistory = historyService.createHistory(history);

    res.json(newHistory);
  };

  updateHistory = (req: Request, res: Response) => {
    const historyId = Number(req.params.historyId);
    const history: PaymentHistory = req.body;
    history.uuid = historyId;
    const newHistory = historyService.updateHistory(history);

    res.json(newHistory);
  };

  deleteHistory = (req: Request, res: Response) => {
    const historyId = Number(req.params.historyId);
    const deletedHistory = historyService.deleteHistory(historyId);

    res.json(deletedHistory);
  };
}

export default new historyController();
