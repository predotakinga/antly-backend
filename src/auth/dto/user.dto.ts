import { IsNotEmpty } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    surname: string;
}
