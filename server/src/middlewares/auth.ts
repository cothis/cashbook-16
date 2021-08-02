import { Request, Response, NextFunction } from 'express';
import { AuthError } from '../errors/CustomErrors';

export const loginCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.session.githubId;
    if (user) next();
    else throw new AuthError();
  } catch (err) {
    next(err);
  }
};
