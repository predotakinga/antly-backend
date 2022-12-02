import { Body, Injectable, Logger, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { FavouritesDto } from './dto/favourites.dto';

@Injectable()
export class FavouritesService {
    constructor(private readonly prismaService: PrismaService) { }


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
        offers.forEach(offer => {
            return offer["favouritesId"] = favourites.filter(favourite => favourite.offerId === offer.id)[0].id
        })
        return offers;
    }

    addToFavourites(
        @Body() { offerId }: FavouritesDto,
        user: User,
    ): Promise<FavouritesDto> {
        const offerProps = this.prismaService.offer.findUnique({ where: { id: offerId } })
        // console.log(offerProps);
        return this.prismaService.favourites.create({
            data: { offerId, userName: user.username }
        });
    }

    async deleteOfferFromFavourites(@Param('id', ParseIntPipe) id: number, username: string): Promise<FavouritesDto> {
        const offer = await this.getFavouritesByUser(username);

        if (!offer)
            throw new NotFoundException(`Not found any offer of id = ${id}`);
        return this.prismaService.favourites.delete({ where: { id } });
    }

}