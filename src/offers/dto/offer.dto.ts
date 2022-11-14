import { IsNotEmpty } from 'class-validator';

export class OfferDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  descriptionShort: string;

  @IsNotEmpty()
  descriptionLong: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  imageUrl: string;

  @IsNotEmpty()
  price: number;
}
