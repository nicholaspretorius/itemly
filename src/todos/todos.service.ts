import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { TodoDto } from './dto/todo.dto';
import { Todo } from './interfaces/todo.interface';
import { ITodosService } from './interfaces/todo.service.interface';

@Injectable()
export class TodosService implements ITodosService {

    private todos: Todo[] = [];
    id: number = 0;

    create(todo): TodoDto {
        // TODO: validate todo object
        if (!todo || !todo.description) this.badRequest('Invalid request', HttpStatus.BAD_REQUEST);

        if (!todo.id) todo.id = ++this.id;

        this.todos.push(todo);
        return this.todos[this.id - 1];
    }

    findAll(): TodoDto[] {
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

        if (!id) throw BadRequestException;

        const todo = this.findOne(id);

        if (!todo) throw NotFoundException; // this.badRequest('Not found', HttpStatus.NOT_FOUND);

        Object.assign(todo, update);
        return todo;
    }

    delete(id: number): TodoDto {

        if (!id) this.badRequest('Invalid request', HttpStatus.BAD_REQUEST);

        const todo = this.findOne(id);

        if (!todo) this.badRequest('Not found', HttpStatus.NOT_FOUND);
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

    private notFound(): HttpException {
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Not found',
        }, 404);
    }

    private badRequest(message: string, exception): HttpException {
        throw new HttpException(message, exception);
    }
}
