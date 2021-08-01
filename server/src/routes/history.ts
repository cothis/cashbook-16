import express from 'express';
import HistoryController from '../controllers/historyController';

const router = express.Router();

router.get('/', HistoryController.getHistories);
router.post('/', HistoryController.createHistory);
router.put('/:historyId', HistoryController.updateHistory);
router.delete('/:historyId', HistoryController.deleteHistory);

export default router;
