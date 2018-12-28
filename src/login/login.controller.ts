import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')

export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    async login(@Body() user) {
        const response = await this.loginService.login(user);
        return response;
    }
}