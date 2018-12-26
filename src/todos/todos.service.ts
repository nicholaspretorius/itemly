import { Injectable, Inject, HttpException, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoDto } from './dto/todo.dto';
import { Todo } from './interfaces/todo.interface';
import { ITodosService } from './interfaces/todo.service.interface';
import { TodoEntity } from './entities/todo.entity';

@Injectable()
export class TodosService implements ITodosService {

    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,
    ) {}

    async create(todo) {
        // TODO: validate todo object
        if (!todo || !todo.description) this.badRequest('Invalid request', HttpStatus.BAD_REQUEST);

        // if (!todo.id) todo.id = ++this.id;
        const create = await this.todoRepository.create(todo);

        return await this.todoRepository.save(create);
    }

    async findAll(): Promise<TodoDto[]> {
        return await this.todoRepository.find();
    }

    async findOne(id: number): Promise<TodoDto> {
        const todo = await this.todoRepository.findOne(id);
        this.checkForEmpty(todo);
        return todo;
    }

    async update(id: number, update): Promise<TodoDto> {

        if (!id) throw BadRequestException;

        await this.todoRepository.update(id, update);

        const todo = this.todoRepository.findOne(id);

        if (!todo) throw NotFoundException;

        return todo;
    }

    async delete(id: number): Promise<TodoDto> {

        if (!id) this.badRequest('Invalid request', HttpStatus.BAD_REQUEST);

        const todo = await this.todoRepository.findOne(id);

        if (!todo) this.badRequest('Not found', HttpStatus.NOT_FOUND);
        else {
            await this.todoRepository.remove(todo);
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
