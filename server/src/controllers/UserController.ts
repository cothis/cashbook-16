import { Request, Response } from 'express';

class UserController {
  constructor() {}

  login(req: Request, res: Response) {
    const { githubId } = req.session ?? 'not-logged-in';
    res.json(githubId);
  }
}

export default new UserController();
