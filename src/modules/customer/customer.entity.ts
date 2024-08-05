import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Sales } from "../transactions/sales.entity";

@Entity("m_customer")
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kode: string;

  @Column()
  name: string;

  @Column()
  telp: string;

  @OneToMany(() => Sales, (sales) => sales.customer)
  sales: Sales[];
}
