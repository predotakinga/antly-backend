"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const lesson_dto_1 = require("./dto/lesson.dto");
const lesson_service_1 = require("./lesson.service");
let LessonController = class LessonController {
    constructor(lessonService) {
        this.lessonService = lessonService;
    }
    getAllLessons() {
        return this.lessonService.getAllLessons();
    }
    signForLesson({ lessonDate, offerId }, user) {
        return this.lessonService.signForLesson({
            lessonDate,
            offerId
        }, user);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "getAllLessons", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lesson_dto_1.LessonDto, Object]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "signForLesson", null);
LessonController = __decorate([
    (0, common_1.Controller)('lesson'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [lesson_service_1.LessonService])
], LessonController);
exports.LessonController = LessonController;
//# sourceMappingURL=lesson.controller.js.map