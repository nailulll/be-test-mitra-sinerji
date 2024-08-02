import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}
