import { Module } from '@nestjs/common';
import { OffersModule } from './offers/offers.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { FavouritesModule } from './favourites/favourites.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    OffersModule,
    AuthModule,
    PrismaModule,
    FavouritesModule
  ],
})
export class AppModule { }

