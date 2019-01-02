import { ITodo } from './todo.interface';
import { Todo } from '../entities/todo.entity';

export interface ITodosService {
    create(todo);
    findAll(): Promise<Todo[]>;
    findOne(id: string): Promise<Todo>;
    update(id: string, todo): Promise<Todo>;
    delete(id: string): Promise<Todo>;
}