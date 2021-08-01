import { PaymentMethod } from '../entity/paymentMethod.entity';

class MethodService {
  constructor() {}

  getMethods = async (githubId?: string): Promise<PaymentMethod[]> => {
    const methods = await PaymentMethod.find({
      where: {
        githubId,
      },
    });

    return methods;
  };

  createMethod = async (
    method: Partial<PaymentMethod>
  ): Promise<PaymentMethod> => {
    const newMethod = PaymentMethod.create(method);
    const result = await PaymentMethod.save(newMethod);

    return result;
  };

  updateMethod = async (method: Partial<PaymentMethod>): Promise<boolean> => {
    const result = await PaymentMethod.update({ id: method.id }, method);

    return (result.affected ?? 0) > 0;
  };

  deleteMethod = async (methodId: number): Promise<boolean> => {
    const result = await PaymentMethod.delete({ id: methodId });

    return (result.affected ?? 0) > 0;
  };
}

export default new MethodService();
