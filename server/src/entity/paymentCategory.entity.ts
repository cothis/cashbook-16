import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { PaymentHistory } from './paymentHistory.entity';

@Entity()
export class PaymentCategory {
  @PrimaryColumn()
  name: string;

  @Column()
  color: string;

  @OneToMany(() => PaymentHistory, (history) => history.category)
  histories: PaymentHistory[];
}
