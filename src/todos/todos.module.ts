import { Module, CacheModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TodoSchema } from './schemas/todo.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]),
        CacheModule.register(),
    ],
    controllers: [TodosController],
    providers: [TodosService],
})
export class TodosModule {}
