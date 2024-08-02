import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { SalesDetail } from "../sales-detail/sales-detail.entity";

@Entity("m_barang")
export class Barang {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kode: string;

  @Column()
  nama: string;

  @Column({ type: "decimal" })
  harga: number;

  @OneToMany((type) => SalesDetail, (salesDetail) => salesDetail.barangId)
  details: SalesDetail[];
}
