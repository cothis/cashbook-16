import express from 'express';
import historyController from '../controllers/historyController';

const router = express.Router();

router.get('/', historyController.getHistories);
router.post('/', historyController.createHistory);
router.put('/:historyId', historyController.updateHistory);
router.delete('/:historyId', historyController.deleteHistory);

export default router;
