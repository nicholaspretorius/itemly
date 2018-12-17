import { Todo } from './todo.interface';

export interface ITodosService {
    create(todo): Todo;
    findAll(): Todo[];
    findOne(id: number): Todo;
    update(id: number, todo): Todo;
    delete(id: number): Todo;
}