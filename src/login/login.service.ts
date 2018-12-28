import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()

export class LoginService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login(user) {
        const valid = await this.validateUser(user);

        if (!valid) {
            throw new UnauthorizedException();
        } else {
            const token = await this.jwtService.sign(user);

            return {
                expiresIn: 3600,
                token,
            };
        }

    }

    async validateUser(user) {
        const userOnRecord = await this.userService.findByEmail(user.email);

        if (userOnRecord) {
            const valid = await bcrypt.compare(user.password, userOnRecord.password);
            if (valid) {
                return valid;
            }
        }
        return false;
    }
}