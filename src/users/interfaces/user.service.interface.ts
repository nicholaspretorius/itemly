import { IUser } from '../interfaces/user.interface';
import { UserDto } from '../dto/user.dto';

export interface IUserService {
    create(user: UserDto): Promise<IUser>;
    findaAll(): Promise<IUser[]>;
    findOne(id: string): Promise<IUser>;
    findByEmail(email: string): Promise<IUser>;
    update(id: string, user): Promise<IUser>;
    delete(id: string): Promise<any>;
    salt(password: string): Promise<any>;
}