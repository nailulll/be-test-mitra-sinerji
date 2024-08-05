import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../infrastructure/infrastructure.module";
import { BarangModule } from "./barang/barang.module";
import { CustomerModule } from "./customer/customer.module";
import { TransactionsModule } from "./transactions/transactions.module";


@Module({
  imports: [InfrastructureModule, BarangModule, CustomerModule, TransactionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
