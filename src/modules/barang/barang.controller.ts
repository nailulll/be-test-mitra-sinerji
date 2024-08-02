import { Controller, Get } from "@nestjs/common";
import { BarangService } from "./barang.service";

@Controller("barang")
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
