import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { OfferDto } from './dto/offer.dto';
export declare class OffersService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAllOffers(): Promise<OfferDto[]>;
    getOfferById(id: number): Promise<OfferDto>;
    createOffer({ title, description, subject, price }: OfferDto, user: User): Promise<OfferDto>;
    deleteOffer(id: number): Promise<OfferDto>;
}
