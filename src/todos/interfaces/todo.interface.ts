import { Document } from 'mongoose';

export interface ITodo extends Document {
    id: string;
    readonly description: string;
    readonly done: boolean;
}