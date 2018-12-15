import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

describe('Todos Controller', () => {

  let testModule: TestingModule;
  let todosService: TodosService;
  let todosController: TodosController;

  beforeAll(async () => {
    testModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService],
    }).compile();

    todosService = testModule.get<TodosService>(TodosService);
    todosController = testModule.get<TodosController>(TodosController);
  });

  it('todosController should be defined', async () => {
    expect(await todosController).toBeDefined();
  });

  it('todosService should be defined', async () => {
    expect(await todosService).toBeDefined();
  });

  describe('create', () => {

    it('should create a todo', async () => {
      const todo = {
        id: 1,
        description: 'test',
        done: false,
      };

      jest.spyOn(todosService, 'create').mockImplementation(() => todo);

      expect(await todosController.create(todo)).toBe(todo);
    });
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const result = [{
        id: 1,
        description: 'test',
        done: false,
      }];
      jest.spyOn(todosService, 'findAll').mockImplementation(() => result);

      expect(await todosController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return one todo', async () => {
      const result = {
        id: 1,
        description: 'test',
        done: false,
      };

      jest.spyOn(todosService, 'findOne').mockImplementation(() => result);

      expect(await todosController.findOne(1)).toBe(result);
    });
  });
});
