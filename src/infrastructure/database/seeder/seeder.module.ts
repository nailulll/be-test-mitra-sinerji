import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Barang } from "../../../modules/barang/barang.entity";
import { Customer } from "../../../modules/customer/customer.entity";
import { SeederCustomerService } from "./seeder-customer.service";
import { SeederBarangService } from "./seeder-barang.service";

@Module({
  imports: [TypeOrmModule.forFeature([Barang, Customer])],
  providers: [SeederCustomerService, SeederBarangService],
})
export class SeederModule {
}