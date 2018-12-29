import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {

        const roles = this.reflector.get<string>('roles', context.getHandler());
        console.log(`Roles: ${roles}`);
        if (!roles) {
            return true;
        }

        // const decoded = this.jwtService.decode()

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        // const user = {
        //     _id: '5c261c5abfdf6f01d3153bf1',
        //     email: 'nicholaspre@icloud.com',
        //     roles: ['user'],
        // };
        console.log('Request User: ', request.req);
        const hasRole = () => user.roles.some((role) => roles.includes(role));
        return user && user.roles && hasRole();

    }
}