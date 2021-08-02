import express from 'express';
import githubLoginRouter from './githubLogin';
import userRouter from './user';
import historyRouter from './history';
import methodRouter from './method';
import categoryRouter from './category';
import { loginCheck } from '../middlewares/auth';

const router = express.Router();

router.use('/githublogin', githubLoginRouter);
router.use('/user', loginCheck, userRouter);
router.use('/histories', loginCheck, historyRouter);
router.use('/methods', loginCheck, methodRouter);
router.use('/categories', loginCheck, categoryRouter);

export default router;
