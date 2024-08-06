import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SalesDetail } from "./sales-detail.entity";
import { Customer } from "../customer/customer.entity";

@Entity("t_sales")
export class Sales {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kode: string;

  @Column({ type: "timestamp" })
  tgl: Date;

  @ManyToOne((type) => Customer, (customer) => customer.sales)
  @JoinColumn({ name: "cust_id" })
  customer: Customer;

  @Column({
    type: "decimal",
    name: "subtotal",
    transformer: {
      to: (value: number): string => value.toString(),
      from: (value: string): number => parseFloat(value),
    },
  })
  subtotal: number;

  @Column({
    type: "decimal",
    transformer: {
      to: (value: number): string => value.toString(),
      from: (value: string): number => parseFloat(value),
    },
  })
  diskon: number;

  @Column({
    type: "decimal",
    transformer: {
      to: (value: number): string => value.toString(),
      from: (value: string): number => parseFloat(value),
    },
  })
  ongkir: number;

  @Column({
    type: "decimal",
    name: "total_bayar",
    transformer: {
      to: (value: number): string => value.toString(),
      from: (value: string): number => parseFloat(value),
    },
  })
  totalBayar: number;

  @OneToMany((type) => SalesDetail, (salesDetail) => salesDetail.sales)
  details: SalesDetail[];
}
