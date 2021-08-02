import { Request, Response, NextFunction } from 'express';

class ErrorController {
  constructor() {}

  handlerError = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  };
}

export default new ErrorController();
