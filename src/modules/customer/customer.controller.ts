import { Controller, Get, UseGuards } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { ThrottlerBehindProxyGuard } from "../../infrastructure/security/throttler-behind-proxy.guard";

@Controller("customer")
@UseGuards(ThrottlerBehindProxyGuard)
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
  ) {
  }

  @Get()
  async findAll() {
    return await this.customerService.findAll();
  }
}
