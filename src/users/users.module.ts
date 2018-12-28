import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { UserSchema } from './schema/user.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [UsersController],
    providers: [UserService],
    exports: [UserService],
})

export class UsersModule {}