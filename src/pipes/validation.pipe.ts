import { ArgumentMetadata, Pipe, PipeTransform, BadRequestException, Injectable } from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class ValidationPipe implements PipeTransform {

  constructor(){}

  schema = {
    description: Joi.string().min(3).max(250).required(),
    done: Joi.boolean(),
  };

  async transform(value: any, metadata: ArgumentMetadata) {
    console.log('Value: ', value);
    const { error } = Joi.validate(value, this.schema);
    console.log('Error: ', error);
    if (error) throw new BadRequestException('Invalid request');
    return value;
  }
}
