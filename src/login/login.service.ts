import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserService } from './../users/users.service';

@Injectable()

export class LoginService {

    constructor(private readonly userService: UserService) {}

    async login(user) {

        const userOnRecord = await this.userService.findByEmail(user.email);

        if (userOnRecord) {
            const valid = await bcrypt.compare(user.password, userOnRecord.password);
            return valid;
        }
    }
}