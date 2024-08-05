import { Module } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionsController } from "./transactions.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sales } from "./sales.entity";
import { Customer } from "../customer/customer.entity";
import { Barang } from "../barang/barang.entity";
import { SalesDetail } from "./sales-detail.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Sales, Customer, Barang, SalesDetail])],
  providers: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {
}
