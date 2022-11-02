import { IsNotEmpty } from 'class-validator';

export class OfferDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  price: number;
}
