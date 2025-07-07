import { IsNotEmpty, IsNumber } from 'class-validator';
import {Type} from "class-transformer";

export class CreateProductDto {
  @IsNotEmpty()
  productName: string;

  @IsNumber()
  @Type(() => Number) // <--- ¡AÑADE ESTO! Esto le dice a class-transformer que convierta a número.
  price: number;
}
