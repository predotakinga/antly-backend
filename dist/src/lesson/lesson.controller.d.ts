import { User } from '@prisma/client';
import { LessonDto } from './dto/lesson.dto';
import { LessonService } from './lesson.service';
export declare class LessonController {
    private lessonService;
    constructor(lessonService: LessonService);
    getAllLessons(): Promise<LessonDto[]>;
    signForLesson({ lessonDate, offerId }: LessonDto, user: User): Promise<LessonDto>;
}
