import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { JwtDecode } from './jwt.decode';
import { JwtStrategy } from './jwt.strategy';
export declare class AuthController {
    private readonly authService;
    private readonly jwtDecode;
    private readonly jwtStrategy;
    constructor(authService: AuthService, jwtDecode: JwtDecode, jwtStrategy: JwtStrategy);
    getUserByUserName(username: string): Promise<UserCredentialsDto>;
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(userCredentialsDto: UserCredentialsDto): Promise<{
        accessToken: string;
    }>;
}
