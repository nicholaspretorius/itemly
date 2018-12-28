import { Controller, Post, Body, Param, Get, Delete, Put } from '@nestjs/common';
import { UserDto } from './user.dto';
import { IUser } from './user.interface';
import { UserService } from './users.service';

@Controller('users')

export class UsersController {

    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() user: UserDto): Promise<IUser> {
        const newUser = await this.userService.create(user);
        return newUser;
    }

    @Get()
    async findAll(): Promise<IUser[]> {
        return await this.userService.findaAll();
    }

    @Get(':id')
    async findOne(@Param() params): Promise<IUser> {
        return await this.userService.findOne(params.id);
    }

    @Get(':email')
    async findByEmail(@Param() email: string): Promise<IUser> {
        return await this.userService.findByEmail(email);
    }

    @Put(':id')
    async update(@Param() params, @Body() user): Promise<IUser> {
        return await this.userService.update(params.id, user);
    }

    @Delete(':id')
    async delete(@Param() params): Promise<IUser> {
        return await this.userService.delete(params.id);
    }

}