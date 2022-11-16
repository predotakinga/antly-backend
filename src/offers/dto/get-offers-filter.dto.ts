import { IsString } from 'class-validator';

export class GetOffersFilterDto {
  // @IsString()
  subject?: string;

  // @IsString()
  range?: string;

  location?: string;
}
