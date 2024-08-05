import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto";

@Controller("transactions")
export class TransactionsController {

  constructor(
    private readonly transactionsService: TransactionsService,
  ) {
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() dto: CreateTransactionDto) {
    return this.transactionsService.create(dto);
  }

}
