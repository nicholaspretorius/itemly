import { Todo } from './todo.interface';
import { TodoEntity } from '../entities/todo.entity';

export interface ITodosService {
    create(todo): any;
    findAll(): Promise<Todo[]>;
    findOne(id: number): Promise<Todo>;
    update(id: number, todo): Promise<Todo>;
    delete(id: number): Promise<Todo>;
}