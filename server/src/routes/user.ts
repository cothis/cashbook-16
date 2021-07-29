import express, { Request, Response } from 'express';
const userRouter = express.Router();

userRouter.get('/', (req: Request, res: Response) => {
  const { githubId } = req.session;
  if (githubId) {
    res.json({
      githubId,
    });
  } else {
    res.json({
      githubId: 'not-logged-in',
    });
  }
});

export default userRouter;
