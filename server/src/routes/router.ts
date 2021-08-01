import express from 'express';
import githubLoginRouter from './githubLogin';
import userRouter from './user';
import historyRouter from './history';

const router = express.Router();

router.use('/githublogin', githubLoginRouter);
router.use('/user', userRouter);
router.use('/histories', historyRouter);

export default router;
