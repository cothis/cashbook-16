import { PaymentMethod } from '../entity/paymentMethod.entity';
import { NextFunction, Request, Response } from 'express';
import methodService from '../services/MethodService';

class MethodController {
  constructor() {}

  getMethods = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const githubId = req.session.githubId;
      const methods: PaymentMethod[] = await methodService.getMethods(githubId);

      res.json(methods);
    } catch (err) {
      next(err);
    }
  };

  createMethod = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const method: Partial<PaymentMethod> = req.body;
      method.githubId = req.session.githubId;
      const newMethod = await methodService.createMethod(method);

      res.json(newMethod);
    } catch (err) {
      next(err);
    }
  };

  updateMethod = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const methodId = Number(req.params.methodId);
      const method: Partial<PaymentMethod> = req.body;
      method.id = methodId;
      const updateResult: boolean = await methodService.updateMethod(method);

      res.json({ result: updateResult });
    } catch (err) {
      next(err);
    }
  };

  deleteMethod = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const methodId = Number(req.params.methodId);
      const deleteResult: boolean = await methodService.deleteMethod(methodId);

      res.json({ result: deleteResult });
    } catch (err) {
      next(err);
    }
  };
}

export default new MethodController();
