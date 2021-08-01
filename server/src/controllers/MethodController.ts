import { PaymentMethod } from '../entity/paymentMethod.entity';
import { Request, Response } from 'express';
import methodService from '../services/MethodService';

class MethodController {
  constructor() {}

  getMethods = async (req: Request, res: Response) => {
    const githubId = req.session.githubId;
    const methods: PaymentMethod[] = await methodService.getMethods(githubId);

    res.json(methods);
  };

  createMethod = async (req: Request, res: Response) => {
    const method: Partial<PaymentMethod> = req.body;
    method.githubId = req.session.githubId;
    const newMethod = await methodService.createMethod(method);

    res.json(newMethod);
  };

  updateMethod = async (req: Request, res: Response) => {
    const methodId = Number(req.params.methodId);
    const method: Partial<PaymentMethod> = req.body;
    method.id = methodId;
    const updateResult: boolean = await methodService.updateMethod(method);

    res.json({ result: updateResult });
  };

  deleteMethod = async (req: Request, res: Response) => {
    const methodId = Number(req.params.methodId);
    const deleteResult: boolean = await methodService.deleteMethod(methodId);

    res.json({ result: deleteResult });
  };
}

export default new MethodController();
