import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Sales } from "./sales.entity";
import { Barang } from "../barang/barang.entity";
import { numberTransformer } from "src/utils";

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
    transformer: numberTransformer,
  })
  hargaBandrol: number;

  @Column({ transformer: numberTransformer })
  qty: number;

  @Column({
    type: "decimal",
    name: "diskon_pct",
    transformer: numberTransformer,
  })
  diskonPct: number;

  @Column({
    type: "decimal",
    name: "diskon_nilai",
    transformer: numberTransformer,
  })
  diskonNilai: number;

  @Column({
    type: "decimal",
    name: "harga_diskon",
    transformer: numberTransformer,
  })
  hargaDiskon: number;

  @Column({ type: "decimal", transformer: numberTransformer })
  total: number;
}
