import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { UserDto } from './user.dto';
import { IUser } from './user.interface';

@Controller('users')

export class UsersController {

    constructor() {}

    @Post()
    async create(@Body() user: UserDto) {}

    @Get()
    async findAll() {
    }

    @Get(':id')
    async findOne(@Param() params): Promise<IUser> {
        const user = new IUser();
        user.firstName = 'Nicholas';
        user.lastName = 'Pretorius';
        user.password = '12345';
        user.email = 'test@test.com';
        user.isAdmin = true;

        return user;
    }

    @Post()
    async findByEmail(@Body() email: string) {}

    @Post(':id')
    async update(@Param() params) {}

    @Delete(':id')
    async delete(@Param() params) {}

}