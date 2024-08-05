import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SalesDetail } from "../transactions/sales-detail.entity";
import { Expose } from "class-transformer";

const numberTransformer = {
  to: (value: number): string => value.toString(),
  from: (value: string): number => parseFloat(value),
};

@Entity("m_barang")
export class Barang {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kode: string;

  @Column()
  nama: string;

  @Column({ type: "decimal", transformer: numberTransformer })
  harga: number;

  @Column({ type: "decimal", transformer: numberTransformer })
  diskon: number;

  @OneToMany((type) => SalesDetail, (salesDetail) => salesDetail.barangId)
  details: SalesDetail[];

  @Expose()
  get price_discount(): number {
    if (this.diskon === 0) {
      return 0;
    }
    return this.harga - (this.harga * (this.diskon / 100));
  }
}
