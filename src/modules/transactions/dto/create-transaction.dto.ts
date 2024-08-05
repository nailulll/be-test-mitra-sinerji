import { ProductDto } from "./product.dto";
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateTransactionDto {
  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  customer: string;

  @ValidateNested()
  @Type(() => ProductDto)
  @IsArray()
  products: ProductDto[];

  @IsNotEmpty()
  @IsNumber()
  feeTransport: number;
}