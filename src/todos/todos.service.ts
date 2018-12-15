import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TodoDto } from './dto/todo.dto';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodosService {

    private todos: Todo[] = [];
    id: number = 0;

    create(todo: Todo): Todo[] {
        if (!todo.id) todo.id = ++this.id;
        this.todos.push(todo);
        return this.todos;
    }

    findAll(): Todo[] {
        return this.todos;
    }

    findOne(id: number): Todo {
        const todos = this.todos
            .filter(todo => todo.id === id);

        if (todos.length === 0) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Not found',
            }, 404);
        } else {
            return todos.pop();
        }
    }

    update(id: number, todoDto: TodoDto) {
        const todo = this.findOne(id);

        if (!todo) return null;

        Object.assign(todo, todoDto);
        return todo;
    }

    delete(id: number): Todo {
        const todo = this.findOne(id);
        this.todos = this.todos
            .filter(item => item.id !== id);
        return todo;
    }
}
