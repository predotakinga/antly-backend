import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/get-user.decorator';
import { GetOffersFilterDto } from './dto/get-offers-filter.dto';
import { OfferDto } from './dto/offer.dto';
import { OffersService } from './offers.service';

@Controller('offers')
@UseGuards(AuthGuard())
export class OffersController {
  constructor(private offersService: OffersService) { }

  @Get()
  getOffers(@Query() filterDto: GetOffersFilterDto): Promise<OfferDto[]> {
    if (Object.keys(filterDto).length) {
      return this.offersService.getOffersWithFilters(filterDto);
    } else {
      return this.offersService.getAllOffers();
    }

  }

  @Get('/:id')
  getOfferById(@Param('id', ParseIntPipe) id: number): Promise<OfferDto> {
    return this.offersService.getOfferById(id);
  }

  //NOWOŚCI

  @Get('/teacher/:teachername')
  getOffersByTeacherName(@Param('teachername') teacherName: string): Promise<OfferDto[]> {
    return this.offersService.getOffersByTeacherName(teacherName);
  }

  @Post()
  createOffer(
    @Body() { title, descriptionShort, descriptionLong, location, imageUrl, subject, price, range }: OfferDto,
    @GetUser() user: User,
  ): Promise<OfferDto> {
    return this.offersService.createOffer(
      {
        title,
        descriptionShort, descriptionLong, location, imageUrl,
        subject,
        price,
        range,
      },
      user,
    );
  }

  @Delete('/:id')
  deleteOffer(@Param('id', ParseIntPipe) id: number): Promise<OfferDto> {
    return this.offersService.deleteOffer(id);
  }
}
