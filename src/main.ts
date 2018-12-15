import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // setup swagger
  const options = new DocumentBuilder()
    .setTitle('Itemly')
    .setDescription('The Itemly Todo API specification')
    .setVersion('0.1')
    .build();

  const swagger = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, swagger);

  await app.listen(3000);
}
bootstrap();
