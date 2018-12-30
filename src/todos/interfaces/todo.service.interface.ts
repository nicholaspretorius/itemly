import { ITodo } from './todo.interface';

export interface ITodosService {
    create(todo, userId): Promise<ITodo>;
    findAll(): Promise<ITodo[]>;
    findOne(id: string): Promise<ITodo>;
    update(id: string, todo): Promise<ITodo>;
    delete(id: string): Promise<ITodo>;
}