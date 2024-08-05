import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

  @ManyToOne(type => Customer, customer => customer.sales)
  @JoinColumn({ name: "cust_id" })
  customer: Customer;

  @Column({ type: "decimal", name: "subtotal" })
  subtotal: number;

  @Column({ type: "decimal" })
  diskon: number;

  @Column({ type: "decimal" })
  ongkir: number;

  @Column({ type: "decimal", name: "total_bayar" })
  totalBayar: number;

  @OneToMany(type => SalesDetail, salesDetail => salesDetail.sales)
  details: SalesDetail[];
}
