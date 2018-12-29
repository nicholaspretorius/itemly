import { Document } from 'mongoose';

export interface IUser extends Document {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: string[];
}