import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [LessonController],
  providers: [LessonService]
})
export class LessonModule { }
