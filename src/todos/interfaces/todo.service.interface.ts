import { Todo } from './todo.interface';

export interface ITodosService {
    create(todo): Promise<Todo>;
    findAll(): Promise<Todo[]>;
    findOne(id: string): Promise<Todo>;
    update(id: string, todo): Promise<Todo>;
    delete(id: string): Promise<Todo>;
}