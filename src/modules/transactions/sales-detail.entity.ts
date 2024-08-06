import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Sales } from "./sales.entity";
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
  barang: Barang;

  @Column({
    type: "decimal",
    name: "harga_bandrol",
    transformer: {
      to: (value: number): string => value.toString(),
      from: (value: string): number => parseFloat(value),
    },
  })
  hargaBandrol: number;

  @Column({
    transformer: {
      to: (value: number): string => value.toString(),
      from: (value: string): number => parseFloat(value),
    },
  })
  qty: number;

  @Column({
    type: "decimal",
    name: "diskon_pct",
    transformer: {
      to: (value: number): string => value.toString(),
      from: (value: string): number => parseFloat(value),
    },
  })
  diskonPct: number;

  @Column({
    type: "decimal",
    name: "diskon_nilai",
    transformer: {
      to: (value: number): string => value.toString(),
      from: (value: string): number => parseFloat(value),
    },
  })
  diskonNilai: number;

  @Column({
    type: "decimal",
    name: "harga_diskon",
    transformer: {
      to: (value: number): string => value.toString(),
      from: (value: string): number => parseFloat(value),
    },
  })
  hargaDiskon: number;

  @Column({
    type: "decimal",
    transformer: {
      to: (value: number): string => value.toString(),
      from: (value: string): number => parseFloat(value),
    },
  })
  total: number;
}
