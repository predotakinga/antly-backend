import { User } from '@prisma/client';
import { GetOffersFilterDto } from './dto/get-offers-filter.dto';
import { OfferDto } from './dto/offer.dto';
import { OffersService } from './offers.service';
export declare class OffersController {
    private offersService;
    constructor(offersService: OffersService);
    getOffers(filterDto: GetOffersFilterDto): Promise<OfferDto[]>;
    getOfferById(id: number): Promise<OfferDto>;
    getOffersByTeacherName(teacherName: string): Promise<OfferDto[]>;
    createOffer({ title, descriptionShort, descriptionLong, location, imageUrl, subject, price, range }: OfferDto, user: User): Promise<OfferDto>;
    updateOffer(id: number, { title, descriptionShort, descriptionLong, location, imageUrl, subject, price, range }: OfferDto): Promise<OfferDto>;
    deleteOffer(id: number): Promise<OfferDto>;
}
