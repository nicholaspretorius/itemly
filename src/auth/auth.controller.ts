import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('auth')
@Controller('login')

export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async login(@Body() user, @Res() res) {
        const auth = await this.authService.login(user);
        res.set('Authorization', 'Bearer ' + auth.token);
        res.send(auth);
    }
}