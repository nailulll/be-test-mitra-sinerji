import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { Barang } from "../../modules/barang/barang.entity";
import { Customer } from "../../modules/customer/customer.entity";
import { Sales } from "../../modules/transactions/sales.entity";
import { SalesDetail } from "../../modules/transactions/sales-detail.entity";

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      url: this.configService.get("CONNECTION_URL"),
      entities: [Barang, Customer, Sales, SalesDetail],
      synchronize: false,
    };
  }
}