import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/get-user.decorator';
import { OfferDto } from './dto/offer.dto';
import { OffersService } from './offers.service';

@Controller('offers')
@UseGuards(AuthGuard())
export class OffersController {
  constructor(private offersService: OffersService) { }

  @Get()
  getAllOffers(): Promise<OfferDto[]> {
    return this.offersService.getAllOffers();
  }

  @Get('/:id')
  getOfferById(@Param('id', ParseIntPipe) id: number): Promise<OfferDto> {
    return this.offersService.getOfferById(id);
  }

  @Post()
  createOffer(
    @Body() { title, descriptionShort, descriptionLong, location, imageUrl, subject, price }: OfferDto,
    @GetUser() user: User,
  ): Promise<OfferDto> {
    return this.offersService.createOffer(
      {
        title,
        descriptionShort, descriptionLong, location, imageUrl,
        subject,
        price,
      },
      user,
    );
  }

  @Delete('/:id')
  deleteOffer(@Param('id', ParseIntPipe) id: number): Promise<OfferDto> {
    return this.offersService.deleteOffer(id);
  }
}
