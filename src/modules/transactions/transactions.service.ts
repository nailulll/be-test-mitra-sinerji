import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Sales } from "./sales.entity";
import { DataSource, Like, Repository } from "typeorm";
import { CreateTransactionDto } from "./dto";
import { Customer } from "../customer/customer.entity";
import { Barang } from "../barang/barang.entity";
import { SalesDetail } from "./sales-detail.entity";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Sales) private readonly salesRepository: Repository<Sales>,
    @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Barang) private readonly barangRepository: Repository<Barang>,
    @InjectRepository(SalesDetail) private readonly salesDetailRepository: Repository<SalesDetail>,
    private dataSource: DataSource,
  ) {
  }

  async getAll() {
    return this.salesRepository.find({
      order: {
        tgl: "DESC",
      },
      relations: {
        customer: true,
        details: true,
      },
    });
  }

  async getOne(kode: string) {
    const sales = await this.salesRepository.findOne({
      where: {
        kode,
      },
      relations: {
        customer: true,
        details: {
          barang: true,
        },
      },
    });
    if (!sales) {
      throw new NotFoundException("Sales not found");
    }
    return sales;
  }

  async create(dto: CreateTransactionDto) {
    const customer = await this.customerRepository.findOneBy({
      kode: dto.customer,
    });

    if (!customer) {
      throw new NotFoundException("Customer not found");
    }

    const sales = this.salesRepository.create();
    sales.tgl = new Date(dto.date);
    sales.customer = customer;

    const products: Barang[] = [];

    for (const product of dto.products) {
      const item = await this.barangRepository.findOneBy({ kode: product.code });
      products.push(item);
    }

    sales.ongkir = dto.feeTransport;
    sales.subtotal = products.reduce((a, b) => {
      const productDto = dto.products.find((p) => p.code === b.kode);
      return a + b.harga * productDto.qty;
    }, 0);
    sales.diskon = products.reduce((a, b) => {
      const productDto = dto.products.find((p) => p.code === b.kode);
      return a + b.harga * (b.diskon / 100) * productDto.qty;
    }, 0);
    sales.totalBayar = sales.subtotal - sales.diskon + sales.ongkir;
    sales.kode = await this.genSalesId();

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const sales1 = await this.salesRepository.save(sales);
      for (let product of products) {
        const detail = this.salesDetailRepository.create();
        const productDto = dto.products.find((p) => p.code === product.kode);
        detail.barang = product;
        detail.sales = sales1;
        detail.hargaBandrol = product.harga;
        detail.qty = productDto.qty;
        detail.diskonPct = product.diskon;
        detail.hargaDiskon = product.price_discount;
        detail.diskonNilai = detail.diskonPct > 0 ? (detail.hargaBandrol - detail.hargaDiskon) : 0;
        detail.total = detail.diskonPct > 0 ? detail.hargaDiskon * productDto.qty : detail.hargaBandrol * productDto.qty;
        await this.salesDetailRepository.save(detail);
      }
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      throw new BadRequestException(e);
    } finally {
      await queryRunner.release();
    }
  }

  private async genSalesId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const prefix = `${year}${month}`;

    const latestSales = await this.salesRepository.find({
      where: { kode: Like(`${prefix}%`) },
      order: { kode: "DESC" },
      take: 1,
    });

    let newCode: string;
    if (latestSales.length === 0) {
      newCode = `${prefix}-0001`;
    } else {
      const latest = latestSales[0].kode;
      const suffix = latest.split("-")[1];
      const newSuffix = (parseInt(suffix, 10) + 1).toString().padStart(4, "0");
      newCode = `${prefix}-${newSuffix}`;
    }

    return newCode;
  }
}
