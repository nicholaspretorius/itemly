import { ITodo } from './todo.interface';

export interface ITodosService {
    create(todo, userId): Promise<ITodo>;
    findAll(userId?: string): Promise<ITodo[]>;
    findOne(id: string, userId?: string): Promise<ITodo>;
    update(id: string, todo, userId?: string): Promise<ITodo>;
    delete(id: string, userId?: string): Promise<ITodo>;
}