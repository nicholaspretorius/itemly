import { Get, Controller, Body, Post } from '@nestjs/common';
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

  @Post('register')
  async registerUser(@Body() params) {
    const pattern = { cmd: 'register' };

    const payload = {
      to: params.to,
      subject: params.subject,
      message: params.message,
    };

    return await this.client.send(pattern, payload);
  }
}
