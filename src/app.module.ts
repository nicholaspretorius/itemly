import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config/**/*.{ts,js}')),
    // MongooseModule.forRoot('mongodb://localhost/itemly01', { useNewUrlParser: true }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    TodosModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('todos');
  }

  constructor() {}
}
