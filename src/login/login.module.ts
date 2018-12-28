import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UsersModule } from './../users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ register: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: 'secretKey',
            signOptions: {
              expiresIn: 3600,
            },
        }),
        UsersModule,
    ],
    controllers: [LoginController],
    providers: [LoginService, JwtStrategy],
})

export class LoginModule {}