import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { LessonDto } from './dto/lesson.dto';
export declare class LessonService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAllLessons(): Promise<LessonDto[]>;
    signForLesson({ lessonDate, offerId }: LessonDto, user: User): Promise<LessonDto>;
}
