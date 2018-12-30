import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root() {
    return { message: 'Hello World! Welcome to the Itemly API!'};
  }
}
