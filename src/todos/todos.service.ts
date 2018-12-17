import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TodoDto } from './dto/todo.dto';
import { Todo } from './interfaces/todo.interface';
import { ITodosService } from './interfaces/todo.service.interface';

@Injectable()
export class TodosService implements ITodosService {

    private todos: Todo[] = [];
    id: number = 0;

    create(todo): Todo {
        // TODO: validate todo object
        if (!todo) this.badRequest();

        if (!todo.id) todo.id = ++this.id;

        this.todos.push(todo);
        return this.todos[this.id - 1];
    }

    findAll(): Todo[] {
        return this.todos;
    }

    findOne(id: number): TodoDto {
        const todos = this
            .findAll()
            .filter(todo => todo.id === id);

        this.checkForEmpty(todos);
        return todos.pop();
    }

    update(id: number, update): TodoDto {

        if (!id) this.badRequest();

        const todo = this.findOne(id);

        if (!todo) this.notFound();

        Object.assign(todo, update);
        return todo;
    }

    delete(id: number): TodoDto {

        if (!id) this.badRequest();

        const todo = this.findOne(id);

        if (!todo) this.notFound();
        else {
            this.todos = this.todos
                .filter(item => item.id !== id);
            return todo;
        }

    }

    private checkForEmpty(todos) {
        if (todos.length === 0) {
            this.notFound();
        } else {
            return;
        }
    }

    private notFound() {
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Not found',
        }, 404);
    }

    private badRequest() {
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: 'Invalid request',
        }, 400);
    }
}
