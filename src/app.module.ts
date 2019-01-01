import { Module, NestModule, MiddlewareConsumer, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { QuotesService } from './quotes/quotes.service';
import * as path from 'path';

@Module({
  imports: [
    TodosModule,
    ConfigModule.load(path.resolve(__dirname, 'config/**/*.{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, QuotesService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('todos');
  }
}
