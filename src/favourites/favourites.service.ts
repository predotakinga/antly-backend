import { Body, Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { FavouritesDto } from './dto/favourites.dto';

@Injectable()
export class FavouritesService {
    constructor(private readonly prismaService: PrismaService) { }

    // addToFavourites(
    //     @Body() { offerId }: FavouritesDto, 
    //     user: User,
    // ): Promise<FavouritesDto> {

    // }

    async getFavouritesByUser(@Param('username') userName: string) {
        const favourites = await this.prismaService.favourites.findMany({ where: { userName } });
        if (!favourites)
            throw new NotFoundException(`Not found any favourites of user name = ${userName}`);
        const favouritesArray = favourites.map(e => e.offerId);
        const offers = await this.prismaService.offer.findMany({
            where: {
                id: { in: favouritesArray },
            }
        })
        return offers;
    }

    addToFavourites(
        @Body() { offerId }: FavouritesDto,
        user: User,
    ): Promise<FavouritesDto> {
        return this.prismaService.favourites.create({
            data: { offerId, userName: user.username }
        });
    }

    // async deleteOfferFromFavourites
    //     (@Param('offerId', ParseIntPipe) offerId: number, @Param('userName') userName: string): Promise<FavouritesDto> {
    //     const favourites = await this.getFavouritesByUser(userName);


    //     if (!favourites)
    //         throw new NotFoundException(`Not found any offer of id = ${offerId}`);
    //     return this.prismaService.favourites.delete({ where: { offerId } });
    // }
}
