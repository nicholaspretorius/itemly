import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './user.interface';
import { IUserService } from './user.service.interface';
import { UserDto } from './user.dto';
import { User } from './user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService implements IUserService {

    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

    async create(user: UserDto): Promise<IUser> {
        user.password = await this.salt(user.password);
        const newUser = new User(user);
        const createdUser = new this.userModel(newUser);
        return await createdUser.save();
    }

    async findaAll(): Promise<IUser[]> {
        return await this.userModel.find();
    }

    async findOne(id: string): Promise<IUser> {
        return await this.userModel.findById(id);
    }

    async findByEmail(email: string): Promise<IUser> {
        return await this.userModel.findOne({ email });
    }

    async update(id: string, user): Promise<IUser> {
        return await this.userModel.findByIdAndUpdate(id, user);
    }

    async delete(id: string): Promise<IUser> {
        return await this.userModel.findByIdAndDelete(id);
    }

    async salt(password: string): Promise<any> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

}