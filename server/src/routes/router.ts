import express from 'express';
import githubLoginRouter from './githubLogin';
import userRouter from './user';

const router = express.Router();

router.use('/githublogin', githubLoginRouter);
router.use('/user', userRouter);

export default router;
