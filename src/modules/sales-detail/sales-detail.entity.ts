import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Sales } from "../sales/sales.entity";
import { Barang } from "../barang/barang.entity";

@Entity("t_sales_det")
export class SalesDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sales, (sales) => sales.details)
  @JoinColumn({ name: "sales_id" })
  sales: Sales;

  @ManyToOne(() => Barang, (barang) => barang.details)
  @JoinColumn({ name: "barang_id" })
  barangId: Barang;

  @Column({ type: "decimal", name: "harga_bandrol" })
  hargaBandrol: number;

  @Column()
  qty: number;

  @Column({ type: "decimal", name: "diskon_pct" })
  diskonPct: number;

  @Column({ type: "decimal", name: "diskon_nilai" })
  diskonNilai: number;

  @Column({ type: "decimal", name: "harga_diskon" })
  hargaDiskon: number;

  @Column({ type: "decimal" })
  total: number;
}
