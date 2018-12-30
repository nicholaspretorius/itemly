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

    async findAll(userId: string): Promise<ITodo[]> {
        const query: any = { userId };
        return await this.todoModel.find(query);
    }

    async findOne(id: string, userId: string): Promise<ITodo> {

        const query = { _id: id, userId };
        const todos = await this.todoModel.findOne(query);

        this.checkForEmpty(todos);

        return todos;
    }

    async update(id: string, update, userId: string): Promise<ITodo> {

        if (!id) throw BadRequestException;

        const query = { _id: id, userId };
        const todo = await this.todoModel.findOneAndUpdate(query, update, { new: true });

        this.checkForEmpty(todo);

        return todo;
    }

    async delete(id: string, userId: string): Promise<ITodo> {

        if (!id) this.badRequest('Invalid request', HttpStatus.BAD_REQUEST);

        const query = { _id: id, userId };

        return await this.todoModel.findOneAndDelete(query);
    }

    private checkForEmpty(todos) {
        if (todos === null || todos.length === 0) {
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
