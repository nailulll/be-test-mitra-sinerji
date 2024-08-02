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
    const items = await this.barangRepository.find();
    for (const item of items) {
      await this.barangRepository.remove(item);
    }
    this.logger.log("Remove seeding");
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

    while (items.length < 50) {
      let name: string;

      do {
        name = faker.commerce.productName();
      } while (uniqueNames.has(name));
      uniqueNames.add(name);
      const item = new Barang();
      item.kode = `BRG-${items.length + 1}`;
      item.nama = name;
      item.harga = basePrice + (items.length * priceIncrement);
      items.push(item);
    }

    await this.barangRepository.save(items);
    this.logger.log("Seeding done");
  }
}