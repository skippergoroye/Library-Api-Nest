import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Book } from './schema/book.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookmodel: mongoose.Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookmodel.find();
    return books;
  }

  async create(book: Book): Promise<Book> {
    const res = await this.bookmodel.create(book);
    return res;
  }

  async findBookId(id: string): Promise<Book> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid book ID');
    }

    const book = await this.bookmodel.findById(id);
    if (!book) {
      throw new NotFoundException(`Book  not found`);
    }
    return book;
  }

  async updateById(id: string, book: Book): Promise<Book> {
    const updatedBook = await this.bookmodel.findByIdAndUpdate(id, book, { 
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      throw new NotFoundException(`Book not found`);
    }

    return updatedBook;
  }
}
