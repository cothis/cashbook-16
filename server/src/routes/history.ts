import express from 'express';
import HistoryController from '../controllers/HistoryController';

const router = express.Router();

router.get('/', HistoryController.getHistories);
router.post('/', HistoryController.createHistory);
router.put('/:historyId', HistoryController.updateHistory);
router.delete('/:historyId', HistoryController.deleteHistory);
router.post('/apply', HistoryController.applyChanges);

export default router;
