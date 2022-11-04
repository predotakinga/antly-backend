import { Module } from '@nestjs/common';
import { OffersModule } from './offers/offers.module';
import { AuthModule } from './auth/auth.module';
import { LessonModule } from './lesson/lesson.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    OffersModule,
    AuthModule,
    LessonModule,
    PrismaModule
  ],
})
export class AppModule { }

