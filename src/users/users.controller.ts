import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { UserDto } from './user.dto';

@Controller('users')

export class UsersController {

    constructor() {}

    @Post()
    async create(@Body() user: UserDto) {}

    @Get()
    async findAll() {}

    @Get(':id')
    async findOne(@Param() params) {}

    @Post()
    async findByEmail(@Body() email: string) {}

    @Post(':id')
    async update(@Param() params) {}

    @Delete(':id')
    async delete(@Param() params) {}

}