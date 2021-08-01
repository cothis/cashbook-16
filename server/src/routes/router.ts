import express from 'express';
import githubLoginRouter from './githubLogin';
import userRouter from './user';
import historyRouter from './history';
import methodRouter from './method';
import categoryRouter from './category';

const router = express.Router();

router.use('/githublogin', githubLoginRouter);
router.use('/user', userRouter);
router.use('/histories', historyRouter);
router.use('/methods', methodRouter);
router.use('/categories', categoryRouter);

export default router;
