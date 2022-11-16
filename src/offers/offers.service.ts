import {
  Body,
  Injectable,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Offer, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { GetOffersFilterDto } from './dto/get-offers-filter.dto';
import { OfferDto } from './dto/offer.dto';

@Injectable()
export class OffersService {
  constructor(private readonly prismaService: PrismaService) { }

  getAllOffers(): Promise<OfferDto[]> {
    return this.prismaService.offer.findMany();
  }

  async getOffersWithFilters(filterDto: GetOffersFilterDto): Promise<OfferDto[]> {
    const { subject, range, location } = filterDto;

    let offers = await this.getAllOffers();

    if (subject) {
      offers = offers.filter((offer) => {
        if (offer.subject.includes(subject)) {
          return true;
        }
        return false;
      })
    }

    if (range) {
      if (range) {
        offers = offers.filter((offer) => {
          if (offer.range.includes(range)) {
            return true;
          }
          return false;
        })
      }

      if (location) {
        if (location) {
          offers = offers.filter((offer) => {
            if (offer.location.includes(location)) {
              return true;
            }
            return false;
          })
        }

        return offers;
      }
    }
  }

  async getOfferById(@Param('id', ParseIntPipe) id: number): Promise<OfferDto> {
    const offer = await this.prismaService.offer.findUnique({ where: { id } });
    if (!offer)
      throw new NotFoundException(`Not found any offer of id = ${id}`);
    return offer;
  }

  createOffer(
    @Body() { title, descriptionShort, descriptionLong, location, imageUrl, subject, price, range }: OfferDto,
    user: User,
  ): Promise<OfferDto> {
    return this.prismaService.offer.create({
      data: { title, descriptionShort, descriptionLong, location, imageUrl, subject, price, range, teacherName: user.username }
    });
  }

  async deleteOffer(@Param('id', ParseIntPipe) id: number): Promise<OfferDto> {
    const offer = await this.getOfferById(id);

    if (!offer)
      throw new NotFoundException(`Not found any offer of id = ${id}`);
    return this.prismaService.offer.delete({ where: { id } });
  }
}
