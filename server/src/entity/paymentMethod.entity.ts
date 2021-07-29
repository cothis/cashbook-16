import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PaymentHistory } from './paymentHistory.entity';

@Entity()
export class PaymentMethod {
  @PrimaryColumn()
  name: string;

  @OneToMany(() => PaymentHistory, (history) => history.method)
  histories: PaymentHistory[];
}
