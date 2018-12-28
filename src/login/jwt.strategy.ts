import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoginService } from './login.service';
import { IJwt } from './interfaces/jwt.interface';

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly loginService: LoginService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey',
        });
    }

    async validate(payload: IJwt) {

        const user = this.loginService.validateUser(payload);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}