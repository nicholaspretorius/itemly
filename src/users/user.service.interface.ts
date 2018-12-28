import { IUser } from './user.interface';

export interface IUserService {
    create(user): Promise<IUser>;
    findaAll(): Promise<IUser[]>;
    findOne(id: string): Promise<IUser>;
    findByEmail(email: string): Promise<IUser>;
    update(user): Promise<IUser>;
    delete(user): Promise<any>;
}