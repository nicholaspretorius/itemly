import { Controller, Post, Body, Res } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')

export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    async login(@Body() user, @Res() res) {
        const auth = await this.loginService.login(user);
        res.set('Authorization', 'Bearer ' + auth.token);
        res.send({ message: 'success' });
    }
}