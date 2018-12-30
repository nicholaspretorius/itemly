import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ITodo } from './interfaces/todo.interface';
import { ITodosService } from './interfaces/todo.service.interface';
import { Todo } from './schemas/todo.schema';

@Injectable()
export class TodosService implements ITodosService {

    constructor(
        @InjectModel('Todo') private readonly todoModel: Model<ITodo>,
    ) {}

    async create(todo, userId): Promise<ITodo> {
        // TODO: validate todo object
        if (!todo || !todo.description) this.badRequest('Invalid request', HttpStatus.BAD_REQUEST);
        const userTodo = {
            description: todo.description,
            done: false,
            userId,
        };
        const newTodo = new Todo(userTodo);
        const created = new this.todoModel(newTodo);
        return await created.save();
    }

    async findAll(): Promise<ITodo[]> {
        return await this.todoModel.find();
    }

    async findOne(id: string): Promise<ITodo> {
        const todos = await this.todoModel.findById(id);

        this.checkForEmpty(todos);
        return todos;
    }

    async update(id: string, update): Promise<ITodo> {

        if (!id) throw BadRequestException;

        return await this.todoModel.findByIdAndUpdate(id, update, { new: true });
    }

    async delete(id: string): Promise<ITodo> {

        if (!id) this.badRequest('Invalid request', HttpStatus.BAD_REQUEST);

        return await this.todoModel.findByIdAndDelete(id);
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
