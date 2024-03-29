import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/get-user.decorator';
import { OfferDto } from 'src/offers/dto/offer.dto';
import { FavouritesDto } from './dto/favourites.dto';
import { FavouritesService } from './favourites.service';

@Controller('favourites')
@UseGuards(AuthGuard())
export class FavouritesController {
    constructor(private favouriteService: FavouritesService) { }

    @Get('/:username')
    getFavouritesByUser(@Param('username') userName: string) {
        return this.favouriteService.getFavouritesByUser(userName);
    }

    @Post()
    addToFavourites(
        @Body() { offerId }: FavouritesDto,
        @GetUser() user: User,
    ) {
        return this.favouriteService.addToFavourites(
            { offerId },
            user,
        )
    }

    @Delete('/:userName/:offerId')
    deleteOfferFromFavourites(@Param('offerId', ParseIntPipe) offerId: number, @Param('userName') userName: string): Promise<FavouritesDto> {
        return this.favouriteService.deleteOfferFromFavourites(offerId, userName);
    }

}
