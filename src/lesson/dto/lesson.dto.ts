import { IsNotEmpty } from 'class-validator';

export class LessonDto {
    @IsNotEmpty()
    lessonDate: Date

    @IsNotEmpty()
    offerId: number
}
