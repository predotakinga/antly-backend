import {
  Body,
  Injectable,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { OfferDto } from './dto/offer.dto';

@Injectable()
export class OffersService {
  constructor(private readonly prismaService: PrismaService) { }

  getAllOffers(): Promise<OfferDto[]> {
    return this.prismaService.offer.findMany();
  }

  async getOfferById(@Param('id', ParseIntPipe) id: number): Promise<OfferDto> {
    const offer = await this.prismaService.offer.findUnique({ where: { id } });
    if (!offer)
      throw new NotFoundException(`Not found any offer of id = ${id}`);
    return offer;
  }

  createOffer(
    @Body() { title, descriptionShort, descriptionLong, location, imageUrl, subject, price }: OfferDto,
    user: User,
  ): Promise<OfferDto> {
    return this.prismaService.offer.create({
      data: { title, descriptionShort, descriptionLong, location, imageUrl, subject, price, teacherName: user.username }
    });
  }

  async deleteOffer(@Param('id', ParseIntPipe) id: number): Promise<OfferDto> {
    const offer = await this.getOfferById(id);

    if (!offer)
      throw new NotFoundException(`Not found any offer of id = ${id}`);
    return this.prismaService.offer.delete({ where: { id } });
  }
}
