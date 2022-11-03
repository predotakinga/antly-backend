import { User } from '@prisma/client';
import { Strategy } from 'passport-jwt';
import { PrismaService } from 'prisma/prisma.service';
import { JwtPayload } from './jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prismaService;
    constructor(prismaService: PrismaService);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
