import { IsNotEmpty, IsNumber } from "class-validator";

export class ProductDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  qty: number;
}