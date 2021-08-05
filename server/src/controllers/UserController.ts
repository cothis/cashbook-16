import { NextFunction, Request, Response } from 'express';

class UserController {
  constructor() {}

  login = (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.session.githubId) throw new Error('not logged in');
      const result = { githubId: '' };
      result.githubId = req.session.githubId ?? 'not-logged-in';
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  test = (req: Request, res: Response) => {
    req.session.githubId = 'cothis';
    res.json({ result: true });
  };
}

export default new UserController();
