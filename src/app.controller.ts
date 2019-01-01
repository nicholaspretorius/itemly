import { Get, Controller, Param, Query } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { QuotesService } from './quotes/quotes.service';

@Controller()
export class AppController {

  @Client({
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379',
    },
  })
  private readonly client: ClientProxy;

  constructor(
    private readonly appService: AppService,
    private readonly quotesService: QuotesService,
  ) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Get('quotes')
  findAll() {
    const pattern = { cmd: 'POSTS' };
    return this.client.send(pattern, []);
    // return this.quotesService.getQuotes();
  }

  @Get('quotes/:id')
  findById(@Param() params) {
    return this.quotesService.getQuote(params.id);
  }

  @Get('random')
  findRandom(@Query() params) {
    return this.quotesService.getRandomQuote();
  }
}
