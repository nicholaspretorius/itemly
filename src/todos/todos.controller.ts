import { Controller, Post, Get, Delete, Put, Header, Param, Body, UsePipes } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { TodoDto } from './dto/todo.dto';
import { TodosService } from './todos.service';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiUseTags('todos')
@Controller('todos')
export class TodosController {

    constructor(private readonly todosService: TodosService) {}

    /**
     *
     * @param todo Create a todo.
     * @returns the todo as confirmation.
     */
    @Post()
    @UsePipes(ValidationPipe)
    @Header('Cache-Control', 'none')
    @ApiOperation({ title: 'Create a todo'})
    async create(@Body() todo) {
        this.todosService.create(todo);
        return todo;
    }

    /**
     * @returns `Todo[]` Returns all available Todos.
     */
    @Get()
    @ApiOperation({ title: 'Retrieve all todos'})
    async findAll() {
        return this.todosService.findAll();
    }

    /**
     *
     * @param params Returns the Todo for the specified `id`.
     */
    @Get(':id')
    @ApiOperation({ title: 'Retrieve a single todo'})
    @ApiImplicitParam({ name: 'id' })
    async findOne(@Param() params) {
        return this.todosService.findOne(String(params.id));
    }

    /**
     *
     * @param params Specify the `id` of the existing Todo.
     * @param todoDto The updated details for the Todo being updated.
     */
    @Put(':id')
    @ApiOperation({ title: 'Update a single todo'})
    @ApiImplicitParam({ name: 'id' })
    async update(@Param() params, @Body() todo) {
        return this.todosService.update(String(params.id), todo);
    }

    /**
     *
     * @param params The `id` for the Todo being deleted.
     */
    @Delete(':id')
    @ApiOperation({ title: 'Delete a single todo'})
    @ApiImplicitParam({ name: 'id' })
    async delete(@Param() params) {
        return this.todosService.delete(String(params.id));
    }
}
