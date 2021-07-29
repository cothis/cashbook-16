import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class PaymentMethod {
  @PrimaryColumn()
  name: string;
}
