import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class QuotesService {

    constructor(private readonly http: HttpService) {}

    getQuotes() {
        return this.http.get('https://jsonplaceholder.typicode.com/posts')
            .pipe(
                map(response => response.data),
            );
    }

    getQuote(id: number) {
        return this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .pipe(
                map(response => response.data),
            );
    }

    getRandomQuote() {
        const random = Math.floor(Math.random() * Math.floor(100));
        return this.http.get(`https://jsonplaceholder.typicode.com/posts/${random}`)
            .pipe(
                map(response => response.data),
            );
    }
}
