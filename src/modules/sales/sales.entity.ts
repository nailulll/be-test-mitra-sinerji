import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { SalesDetail } from "../sales-detail/sales-detail.entity";

@Entity("t_sales")
export class Sales {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kode: string;

  @Column({ type: "timestamp" })
  tgl: Date;

  @Column({ name: "cust_id" })
  custId: number;

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
