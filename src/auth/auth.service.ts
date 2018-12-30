import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IJwt } from './interfaces/jwt.interface';

@Injectable()

export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login(user) {

        if (!user.email || !user.password) {
            throw new UnauthorizedException();
        }

        const userOnRecord = await this.authorise(user);

        if (!userOnRecord) {
            throw new UnauthorizedException();
        } else {
            const payload: IJwt = { _id: userOnRecord._id , email: userOnRecord.email, roles: userOnRecord.roles };
            const token = await this.jwtService.sign(payload);

            return {
                expiresIn: 1800,
                token,
            };
        }

    }

    async authorise(user) {
        const userOnRecord = await this.userService.findByEmail(user.email);

        if (userOnRecord) {
            const valid = await bcrypt.compare(user.password, userOnRecord.password);
            if (valid) {
                return userOnRecord;
            }
        }
        return false;
    }

    async validateUser(user) {
        return await this.userService.findByEmail(user.email);
    }
}