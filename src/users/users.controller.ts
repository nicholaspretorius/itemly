import { Controller, Post, Body, Param, Get, Delete, Put, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { IUser } from './interfaces/user.interface';
import { UserService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './../login/roles.guard';
import { Roles } from './../login/roles.decorator';

@Controller('users')

export class UsersController {

    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() user: UserDto): Promise<IUser> {
        const newUser = await this.userService.create(user);
        return newUser;
    }

    @Get()
    @Roles('admin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async findAll(): Promise<IUser[]> {
        return await this.userService.findaAll();
    }

    @Get(':id')
    @Roles('admin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
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