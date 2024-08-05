import { ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors } from "@nestjs/common";
import { BarangService } from "./barang.service";
import { ThrottlerBehindProxyGuard } from "../../infrastructure/security/throttler-behind-proxy.guard";

@Controller("barang")
@UseGuards(ThrottlerBehindProxyGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class BarangController {
  constructor(
    private readonly barangService: BarangService,
  ) {
  }

  @Get()
  async findAll() {
    return await this.barangService.findAll();
  }
}
