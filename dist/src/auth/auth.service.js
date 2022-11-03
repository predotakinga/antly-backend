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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const auth_credentials_dto_1 = require("./dto/auth-credentials.dto");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const user_credentials_dto_1 = require("./dto/user-credentials.dto");
const jwt_decode_1 = require("./jwt.decode");
let AuthService = class AuthService {
    constructor(prismaService, jwtService, jwtDecode) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.jwtDecode = jwtDecode;
    }
    async signUp({ username, password, name, surname }) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        await this.prismaService.user
            .create({
            data: { username, password: hashedPassword, name, surname },
        })
            .catch((err) => {
            if (err.code === 'P2002')
                throw new common_1.ConflictException('This username is already taken.');
            else {
                return this.prismaService.user.create({
                    data: { username, password: hashedPassword, name, surname },
                });
            }
        });
    }
    async signIn({ username, password }) {
        const user = await this.prismaService.user.findUnique({
            where: { username },
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken };
        }
        else {
            throw new common_1.UnauthorizedException('Please check your login credentials');
        }
    }
};
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_credentials_dto_1.AuthCredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signUp", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_credentials_dto_1.UserCredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signIn", null);
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        jwt_decode_1.JwtDecode])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map