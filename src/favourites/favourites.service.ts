import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { FavouritesDto } from './dto/favourites.dto';

@Injectable()
export class FavouritesService {
    constructor(private readonly prismaService: PrismaService) { }

    async getFavouritesByUser(@Param('username') userName: string): Promise<FavouritesDto[]> {
        const favourites = await this.prismaService.favourites.findMany({ where: { userName } });
        if (!favourites)
            throw new NotFoundException(`Not found any favourites of user name = ${userName}`);
        return favourites;
    }

    addToFavourites(
        @Body() { offerId }: FavouritesDto,
        user: User,
    ): Promise<FavouritesDto> {
        return this.prismaService.favourites.create({
            data: { offerId, userName: user.username }
        });
    }
}
