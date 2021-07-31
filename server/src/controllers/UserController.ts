import { Request, Response } from 'express';

class UserController {
  constructor() {}

  login = (req: Request, res: Response) => {
    const result = { githubId: '' };
    result.githubId = req.session.githubId ?? 'not-logged-in';
    res.json(result);
  };
}

export default new UserController();
