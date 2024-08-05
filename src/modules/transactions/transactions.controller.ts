import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto";
import { ThrottlerBehindProxyGuard } from "../../infrastructure/security/throttler-behind-proxy.guard";

@Controller("transactions")
@UseGuards(ThrottlerBehindProxyGuard)
export class TransactionsController {

  constructor(
    private readonly transactionsService: TransactionsService,
  ) {
  }

  @Get()
  getAll() {
    return this.transactionsService.getAll();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() dto: CreateTransactionDto) {
    return this.transactionsService.create(dto);
  }

}
