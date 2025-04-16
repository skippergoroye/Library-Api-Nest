import { Controller, Get } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';

@Controller('books')
export class BookController {
    constructor(private bookService:BookService){}
      
    @Get()
    async getAllBooks() : Promise<Book[]> {
        return this.bookService.findAll()
    }
}
