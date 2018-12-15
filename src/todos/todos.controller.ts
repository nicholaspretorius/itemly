import { Controller, Post, Get, Delete, Put, Header, Param, Body } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { TodoDto } from './dto/todo.dto';
import { TodosService } from './todos.service';

@ApiUseTags('todos')
@Controller('todos')
export class TodosController {

    constructor(private readonly todosService: TodosService) {}

    /**
     *
     * @param todoDto Create a todo with a `TodoDto`.
     * @returns todoDto Returns the `TodoDto` as confirmation.
     */
    @Post()
    @Header('Cache-Control', 'none')
    @ApiOperation({ title: 'Create a todo'})
    async create(@Body() todoDto: TodoDto) {
        this.todosService.create(todoDto);
        return todoDto;
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
        return this.todosService.findOne(Number(params.id));
    }

    /**
     *
     * @param params Specify the `id` of the existing Todo.
     * @param todoDto The updated details for the Todo being updated.
     */
    @Put(':id')
    @ApiOperation({ title: 'Update a single todo'})
    @ApiImplicitParam({ name: 'id' })
    async update(@Param() params, @Body() todoDto: TodoDto) {
        return this.todosService.update(Number(params.id), todoDto);
    }

    /**
     *
     * @param params The `id` for the Todo being deleted.
     */
    @Delete(':id')
    @ApiOperation({ title: 'Delete a single todo'})
    @ApiImplicitParam({ name: 'id' })
    async delete(@Param() params) {
        return this.todosService.delete(Number(params.id));
    }
}
