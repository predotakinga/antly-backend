import { IsNotEmpty } from 'class-validator';

export class FavouritesDto {
    @IsNotEmpty()
    offerId: number;
}