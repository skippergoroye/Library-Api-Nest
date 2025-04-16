import { Injectable } from '@nestjs/common';
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
}
