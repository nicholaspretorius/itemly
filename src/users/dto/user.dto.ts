import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserDto {

    @ApiModelProperty()
    @IsNotEmpty({ message: 'First name is required.' })
    firstName: string;

    @ApiModelProperty()
    @IsNotEmpty({ message: 'Last name is required.' })
    lastName: string;

    @ApiModelProperty()
    @IsEmail(undefined, { message: 'Email address is required.' })
    email: string;

    @ApiModelProperty()
    @IsNotEmpty({ message: 'Password is required.' })
    @MinLength(8, { message: 'Password must be a minimum of 8 characters long.'})
    password: string;

    @ApiModelProperty()
    roles: string[];
}