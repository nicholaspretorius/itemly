import { Injectable, Inject, HttpException, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoDto } from './dto/todo.dto';
import { ITodo } from './interfaces/todo.interface';
import { ITodosService } from './interfaces/todo.service.interface';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService implements ITodosService {

    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
    ) {}

    async create(todo): Promise<Todo> {
        // TODO: validate todo object
        if (!todo || !todo.description) this.badRequest('Invalid request', HttpStatus.BAD_REQUEST);

        return await this.todoRepository.save(todo);
    }

    async findAll(): Promise<Todo[]> {
        return await this.todoRepository.find();
    }

    async findOne(id: string): Promise<Todo> {
        const todos = await this.todoRepository.findOne(id);
        this.checkForEmpty(todos);
        return todos;
    }

    async update(id: string, update): Promise<Todo> {
        // if (!id) throw BadRequestException;

        const todo = await this.todoRepository.findOne(id);

        if (!todo) throw NotFoundException; // this.badRequest('Not found', HttpStatus.NOT_FOUND);

        const updated = await this.todoRepository.merge(todo, update);
        this.todoRepository.save(updated);

        return updated;
    }

    async delete(id: string): Promise<Todo> {

        if (!id) this.badRequest('Invalid request', HttpStatus.BAD_REQUEST);

        const todo = await this.findOne(id);

        if (!todo) this.badRequest('Not found', HttpStatus.NOT_FOUND);
        else {
            await this.todoRepository.remove(todo);
            return todo;
        }
    }

    private checkForEmpty(todos) {
        if (todos === undefined || todos.length === 0) {
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
