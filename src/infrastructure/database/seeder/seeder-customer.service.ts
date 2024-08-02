import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "../../../modules/customer/customer.entity";
import { Repository } from "typeorm";
import { faker } from "@faker-js/faker";

@Injectable()
export class SeederCustomerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(SeederCustomerService.name);

  constructor(
    @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
  ) {
  }

  async onModuleDestroy() {
    const items = await this.customerRepository.find();
    for (const item of items) {
      await this.customerRepository.remove(item);
    }
    this.logger.log("Remove seeding");
  }

  async onModuleInit() {
    const count = await this.customerRepository.count();
    if (count > 0) {
      return;
    }
    const items: Customer[] = [];
    const uniqueNames = new Set<string>();
    while (items.length < 15) {
      let name: string;
      do {
        name = faker.person.fullName();
      } while (uniqueNames.has(name));
      uniqueNames.add(name);
      const item = new Customer();
      item.kode = `CUS-${items.length + 1}`;
      item.name = name;
      item.telp = faker.phone.number("+62#########");
      items.push(item);
    }
    await this.customerRepository.save(items);
    this.logger.log("Seeding done");
  }

}