import { PrismaService } from '../../prisma/prisma.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { JwtDecode } from './jwt.decode';
export declare class AuthService {
    private readonly prismaService;
    private jwtService;
    private jwtDecode;
    constructor(prismaService: PrismaService, jwtService: JwtService, jwtDecode: JwtDecode);
    signUp({ username, password, name, surname }: AuthCredentialsDto): Promise<void>;
    signIn({ username, password }: UserCredentialsDto): Promise<{
        accessToken: string;
    }>;
}
