import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto";
import { ThrottlerBehindProxyGuard } from "../../infrastructure/security/throttler-behind-proxy.guard";

@Controller("transactions")
@UseGuards(ThrottlerBehindProxyGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class TransactionsController {

  constructor(
    private readonly transactionsService: TransactionsService,
  ) {
  }

  @Get()
  getAll() {
    return this.transactionsService.getAll();
  }

  @Get(":id")
  genSalesId(@Param() params: { id: string }) {
    return this.transactionsService.getOne(params.id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() dto: CreateTransactionDto) {
    return this.transactionsService.create(dto);
  }

}
