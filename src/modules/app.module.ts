import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../infrastructure/infrastructure.module";
import { BarangModule } from "./barang/barang.module";
import { CustomerModule } from "./customer/customer.module";
import { SalesModule } from "./sales/sales.module";
import { SalesDetailModule } from "./sales-detail/sales-detail.module";

@Module({
  imports: [InfrastructureModule, BarangModule, CustomerModule, SalesModule, SalesDetailModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
