import { Body, Injectable } from '@nestjs/common';
import { Offer, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { LessonDto } from './dto/lesson.dto';

@Injectable()
export class LessonService {
    constructor(private readonly prismaService: PrismaService) { }

    async getAllLessons(): Promise<LessonDto[]> {
        return await this.prismaService.lesson.findMany();
    }

    async signForLesson(
        @Body() { lessonDate, offerId }: LessonDto,
        user: User,
    ): Promise<LessonDto> {
        return await this.prismaService.lesson.create({
            data: { lessonDate, offerId, userId: user.id }
        });
    }
}


// createOffer(
//     @Body() { title, description, subject, price }: OfferDto,
//     user: User,
//   ): Promise < OfferDto > {
//     return this.prismaService.offer.create({
//         data: { title, description, subject, price, teacherName: user.username }
//     });
// }
