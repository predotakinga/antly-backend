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
exports.OffersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const offer_dto_1 = require("./dto/offer.dto");
let OffersService = class OffersService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    getAllOffers() {
        return this.prismaService.offer.findMany();
    }
    async getOffersWithFilters(filterDto) {
        const { subject, range, location } = filterDto;
        let offers = await this.getAllOffers();
        if (subject) {
            offers = offers.filter((offer) => {
                if (offer.subject.includes(subject)) {
                    return true;
                }
                return false;
            });
        }
        if (range) {
            if (range) {
                offers = offers.filter((offer) => {
                    if (offer.range.includes(range)) {
                        return true;
                    }
                    return false;
                });
            }
            if (location) {
                if (location) {
                    offers = offers.filter((offer) => {
                        if (offer.location.includes(location)) {
                            return true;
                        }
                        return false;
                    });
                }
                return offers;
            }
        }
    }
    async getOfferById(id) {
        const offer = await this.prismaService.offer.findUnique({ where: { id } });
        if (!offer)
            throw new common_1.NotFoundException(`Not found any offer of id = ${id}`);
        return offer;
    }
    async getOffersByTeacherName(teacherName) {
        const offers = await this.prismaService.offer.findMany({ where: { teacherName } });
        if (!offers)
            throw new common_1.NotFoundException(`Not found any offer of teacher name = ${teacherName}`);
        return offers;
    }
    createOffer({ title, descriptionShort, descriptionLong, location, imageUrl, subject, price, range }, user) {
        return this.prismaService.offer.create({
            data: { title, descriptionShort, descriptionLong, location, imageUrl, subject, price, range, teacherName: user.username }
        });
    }
    updateOffer(id, { title, descriptionShort, descriptionLong, location, imageUrl, subject, price, range }) {
        return this.prismaService.offer.update({
            data: { title, descriptionShort, descriptionLong, location, imageUrl, subject, price, range },
            where: { id },
        });
    }
    async deleteOffer(id) {
        const offer = await this.getOfferById(id);
        if (!offer)
            throw new common_1.NotFoundException(`Not found any offer of id = ${id}`);
        return this.prismaService.offer.delete({ where: { id } });
    }
};
__decorate([
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OffersService.prototype, "getOfferById", null);
__decorate([
    __param(0, (0, common_1.Param)('teachername')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OffersService.prototype, "getOffersByTeacherName", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [offer_dto_1.OfferDto, Object]),
    __metadata("design:returntype", Promise)
], OffersService.prototype, "createOffer", null);
__decorate([
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, offer_dto_1.OfferDto]),
    __metadata("design:returntype", Promise)
], OffersService.prototype, "updateOffer", null);
__decorate([
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OffersService.prototype, "deleteOffer", null);
OffersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OffersService);
exports.OffersService = OffersService;
//# sourceMappingURL=offers.service.js.map