import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService],
    }).compile();
    service = module.get<TodosService>(TodosService);
  });

  const todo1 = {
    description: 'test1',
    done: false,
  };

  const todo2 = {
    description: 'test2',
    done: true,
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', async () => {

    const result = await service.create(todo1);

    it('should have an id property', async () => {
      expect(result).toHaveProperty('id');
    });

    it('should have an id of 1', async () => {
      expect(result.id).toEqual(1);
    });

    it('should increase number of todos by 1', async () => {
      const numTodos = service.findAll();
      expect(numTodos.length).toEqual(1);
    });

    await service.delete(1);
  });

  describe('findAll 0', () => {
    it('should return an empty todo array', async () => {
      const result = await service.findAll();
      expect(result).toHaveLength(0);
    });
  });

  describe('findAll 1', () => {
    it('should return a todo array', async () => {
      await service.create(todo1);
      const result = await service.findAll();
      expect(result).toHaveLength(1);
      await service.delete(1);
    });
  });

  describe('findAll >1', () => {
    it('should return a todo array', async () => {
      await service.create(todo1);
      await service.create(todo2);

      const result = await service.findAll();

      expect(result).toHaveLength(2);

      await service.delete(1);
      await service.delete(2);
    });
  });

  describe('findOne(1)', async () => {
    await service.create(todo1);

    it('should not find the todo', async () => {
      const result = await service.findOne(999);
      expect(result).toThrowError();
    });

    it('should return the specified todo', async () => {
      const result = await service.findOne(1);
      expect(result.id).toEqual(1);
    });

    await service.delete(1);
  });

  describe('update', async () => {
    await service.create(todo1);

    const update = {
      description: 'update1',
      done: true,
    };

    // TODO: it('should receive a valid object', async () => {});

    it('should not increase the number of todos', async () => {
      await this.update(1, update);
      const result = await this.findAll();
      expect(result.length).toEqual(1);
    });

    it('should return the updated todo', async () => {
      const result = service.update(1, update);

      expect(result.description).toEqual('update1');
      expect(result.done).toEqual(true);
      expect(result.id).toEqual(1);
    });

    await service.delete(1);
  });

  describe('delete', async () => {

    beforeEach(async () => {
      await service.create(todo1);
    });

    it('should find the appropriate todo', async () => {
      const result = await service.delete(1);
      expect(result.id).toEqual(1);
    });

    it('should reduce the number of todos by 1', async () => {
      await service.delete(1);
      const result = service.findAll();
      expect(result.length).toEqual(0);
    });
  });
});
