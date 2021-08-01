import express from 'express';
import methodController from '../controllers/MethodController';

const router = express.Router();

router.get('/', methodController.getMethods);
router.post('/', methodController.createMethod);
router.put('/:methodId', methodController.updateMethod);
router.delete('/:methodId', methodController.deleteMethod);

export default router;
