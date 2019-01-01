import { Controller, CacheInterceptor, Post, Get, Delete, Put, Header, Param, Body, UsePipes, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { TodoDto } from './dto/todo.dto';
import { TodosService } from './todos.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './../auth/roles.guard';
import { Roles } from './../auth/roles.decorator';

@ApiUseTags('todos')
@Controller('todos')
@UseInterceptors(CacheInterceptor)
@Roles('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TodosController {

    constructor(private readonly todosService: TodosService) {}

    /**
     *
     * @param todo Create a todo.
     * @returns the todo as confirmation.
     */
    @Post()
    // @UsePipes(ValidationPipe)
    @Header('Cache-Control', 'none')
    @ApiOperation({ title: 'Create a todo'})
    async create(@Body() todo: TodoDto, @Req() req) {
        const newTodo = await this.todosService.create(todo, req.user._id);
        return newTodo;
    }

    /**
     * @returns `Todo[]` Returns all available Todos.
     */
    @Get()
    @ApiOperation({ title: 'Retrieve all todos'})
    async findAll(@Req() req) {
        return this.todosService.findAll(req.user._id);
    }

    /**
     *
     * @param params Returns the Todo for the specified `id`.
     */
    @Get(':id')
    @ApiOperation({ title: 'Retrieve a single todo'})
    @ApiImplicitParam({ name: 'id' })
    async findOne(@Param() params, @Req() req) {
        return this.todosService.findOne(String(params.id), req.user._id);
    }

    /**
     *
     * @param params Specify the `id` of the existing Todo.
     * @param todoDto The updated details for the Todo being updated.
     */
    @Put(':id')
    // @UsePipes(ValidationPipe)
    @ApiOperation({ title: 'Update a single todo'})
    @ApiImplicitParam({ name: 'id' })
    async update(@Param() params, @Body() todo, @Req() req) {
        return this.todosService.update(String(params.id), todo, req.user._id);
    }

    /**
     *
     * @param params The `id` for the Todo being deleted.
     */
    @Delete(':id')
    @ApiOperation({ title: 'Delete a single todo'})
    @ApiImplicitParam({ name: 'id' })
    async delete(@Param() params, @Req() req) {
        return this.todosService.delete(String(params.id), req.user._id);
    }
}
