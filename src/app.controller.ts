import { Get, Controller } from '@nestjs/common';
import { Transport, Client, ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get()
  root() {
    return this.appService.root();
  }

  @Client({ transport: Transport.TCP })
  client: ClientProxy;

  @Get('register')
  registerUser() {
    const pattern = { cmd: 'register' };

    return this.client.send(pattern, []);
  }
}
