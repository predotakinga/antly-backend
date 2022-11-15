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
exports.OffersController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const get_offers_filter_dto_1 = require("./dto/get-offers-filter.dto");
const offer_dto_1 = require("./dto/offer.dto");
const offers_service_1 = require("./offers.service");
let OffersController = class OffersController {
    constructor(offersService) {
        this.offersService = offersService;
    }
    getOffers(filterDto) {
        if (Object.keys(filterDto).length) {
            return this.offersService.getOffersWithFilters(filterDto);
        }
        else {
            return this.offersService.getAllOffers();
        }
    }
    getOfferById(id) {
        return this.offersService.getOfferById(id);
    }
    createOffer({ title, descriptionShort, descriptionLong, location, imageUrl, subject, price, range }, user) {
        return this.offersService.createOffer({
            title,
            descriptionShort, descriptionLong, location, imageUrl,
            subject,
            price,
            range,
        }, user);
    }
    deleteOffer(id) {
        return this.offersService.deleteOffer(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_offers_filter_dto_1.GetOffersFilterDto]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "getOffers", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "getOfferById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [offer_dto_1.OfferDto, Object]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "createOffer", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "deleteOffer", null);
OffersController = __decorate([
    (0, common_1.Controller)('offers'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [offers_service_1.OffersService])
], OffersController);
exports.OffersController = OffersController;
//# sourceMappingURL=offers.controller.js.map