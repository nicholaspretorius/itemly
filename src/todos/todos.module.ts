import { Module, CacheModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TodoSchema } from './schemas/todo.schema';
import { ConfigService } from 'nestjs-config';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]),
        CacheModule.registerAsync({
            useFactory: (config: ConfigService) => config.get('cache'),
            inject: [ConfigService],
        }),
    ],
    controllers: [TodosController],
    providers: [TodosService],
})
export class TodosModule {}
