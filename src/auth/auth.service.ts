import {
  Body,
  ConflictException,
  Injectable,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { JwtDecode } from './jwt.decode';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private jwtDecode: JwtDecode,
  ) { }

  async signUp(
    @Body() { username, password, name, surname, telephone, email }: AuthCredentialsDto,
  ) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await this.prismaService.user
      .create({
        data: { username, password: hashedPassword, name, surname, telephone, email },
      })
      .catch((err) => {
        if (err.code === 'P2002')
          throw new ConflictException('This username is already taken.');
        else {
          return this.prismaService.user.create({
            data: { username, password: hashedPassword, name, surname, telephone, email },
          });
        }
      });
  }
  async signIn(
    @Body() { username, password }: UserCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
