import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Offer, User } from '@prisma/client';
import { GetUser } from 'src/auth/get-user.decorator';
import { LessonDto } from './dto/lesson.dto';
import { LessonService } from './lesson.service';

@Controller('lesson')
@UseGuards(AuthGuard())
export class LessonController {
    constructor(private lessonService: LessonService) { }

    @Get()
    getAllLessons(): Promise<LessonDto[]> {
        return this.lessonService.getAllLessons();
    }

    @Post()
    signForLesson(
        @Body() { lessonDate, offerId }: LessonDto,
        @GetUser() user: User,
    ): Promise<LessonDto> {
        return this.lessonService.signForLesson(
            {
                lessonDate,
                offerId
            },
            user,
        );
    }
}
