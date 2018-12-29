import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { LoginService } from './login.service';
import { IJwt } from './interfaces/jwt.interface';

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly loginService: LoginService,
        private readonly jwtService: JwtService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey',
        });
    }

    async validate(payload: IJwt) {
        console.log(`JWT payload`, payload);
        const user = this.loginService.validateUser(payload);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}