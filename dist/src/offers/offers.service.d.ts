import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { GetOffersFilterDto } from './dto/get-offers-filter.dto';
import { OfferDto } from './dto/offer.dto';
export declare class OffersService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAllOffers(): Promise<OfferDto[]>;
    getOffersWithFilters(filterDto: GetOffersFilterDto): Promise<OfferDto[]>;
    getOfferById(id: number): Promise<OfferDto>;
    createOffer({ title, descriptionShort, descriptionLong, location, imageUrl, subject, price, range }: OfferDto, user: User): Promise<OfferDto>;
    deleteOffer(id: number): Promise<OfferDto>;
}
