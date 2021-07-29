import express, { Request, Response } from 'express';
const userRouter = express.Router();

userRouter.get('/', (req: Request, res: Response) => {
  const { username } = req.session;
  if (username) {
    res.json({
      username,
    });
  } else {
    res.json({
      username: 'not-logged-in',
    });
  }
});

export default userRouter;
