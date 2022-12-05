import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;


  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  @MaxLength(9)
  telephone: string;


  @IsNotEmpty()
  @IsString()
  email: string;
}
