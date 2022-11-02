import { Module } from '@nestjs/common';
import { OffersService } from 'src/offers/offers.service';
import { PrismaService } from './prisma.service';

@Module({
  providers: [OffersService, PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
