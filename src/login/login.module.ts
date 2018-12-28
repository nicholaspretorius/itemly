import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UsersModule } from './../users/users.module';

@Module({
    imports: [UsersModule],
    controllers: [LoginController],
    providers: [LoginService],
})

export class LoginModule {}