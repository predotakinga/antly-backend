import { Module } from '@nestjs/common';
import { OffersModule } from './offers/offers.module';
import { AuthModule } from './auth/auth.module';
import { LessonModule } from './lesson/lesson.module';


@Module({
  imports: [OffersModule, AuthModule, LessonModule],
})
export class AppModule { }
