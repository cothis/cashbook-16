import express from 'express';
import githubLoginRouter from './githubLogin';
import userRouter from './user';
import historyRouter from './history';
import methodRouter from './method';

const router = express.Router();

router.use('/githublogin', githubLoginRouter);
router.use('/user', userRouter);
router.use('/histories', historyRouter);
router.use('/methods', methodRouter);

export default router;
