import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class UserDto {

    @IsNotEmpty({ message: 'First name is required.' })
    firstName: string;

    @IsNotEmpty({ message: 'Last name is required.' })
    lastName: string;

    @IsEmail(undefined, { message: 'Email address is required.' })
    email: string;

    @IsNotEmpty({ message: 'Password is required.' })
    @MinLength(8, { message: 'Password must be a minimum of 8 characters long.'})
    password: string;
}