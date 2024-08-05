import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Barang } from "../../../modules/barang/barang.entity";
import { Repository } from "typeorm";
import { faker } from "@faker-js/faker";

@Injectable()
export class SeederBarangService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(SeederBarangService.name);

  constructor(
    @InjectRepository(Barang) private readonly barangRepository: Repository<Barang>,
  ) {
  }

  async onModuleDestroy() {
    // const items = await this.barangRepository.find();
    // try {
    //   for (const item of items) {
    //     await this.barangRepository.remove(item);
    //   }
    //   this.logger.log("Remove seeding");
    // } catch (error) {
    //   this.logger.error("Error when remove seeding", error);
    // }
  }

  async onModuleInit() {
    const count = await this.barangRepository.count();
    if (count > 0) {
      return;
    }
    const items: Barang[] = [];
    const basePrice = 10000;
    const priceIncrement = 2600;
    const uniqueNames = new Set<string>();

    let index = 1;
    while (items.length < 50) {
      let name: string;
      index++;
      do {
        name = faker.commerce.productName();
      } while (uniqueNames.has(name));
      uniqueNames.add(name);
      const item = new Barang();
      item.kode = `BRG-${items.length + 1}`;
      item.nama = name;
      item.harga = basePrice + (items.length * priceIncrement);
      item.diskon = this.isEven(index) ? 0 : Math.floor(Math.random() * 91);
      items.push(item);
    }

    await this.barangRepository.save(items);
    this.logger.log("Seeding done");
  }

  private isEven(num: number) {
    return num % 2 === 0;
  }
}