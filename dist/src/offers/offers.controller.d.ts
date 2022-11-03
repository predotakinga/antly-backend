import { User } from '@prisma/client';
import { OfferDto } from './dto/offer.dto';
import { OffersService } from './offers.service';
export declare class OffersController {
    private offersService;
    constructor(offersService: OffersService);
    getAllOffers(): Promise<OfferDto[]>;
    getOfferById(id: number): Promise<OfferDto>;
    createOffer({ title, description, subject, price }: OfferDto, user: User): Promise<OfferDto>;
    deleteOffer(id: number): Promise<OfferDto>;
}
