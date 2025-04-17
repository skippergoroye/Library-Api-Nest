import {
  BadRequestException,
  Injectable,
  NotFoundException, 
} from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Book } from './schema/book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Query  } from 'express-serve-static-core';
import { title } from 'process';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookmodel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
    // console.log(query);
    const  keyword = query.keyword ? {
      title: {
        $regex: query.keyword,
        $options: 'i',
      }
      
    } : {}; 
    const books = await this.bookmodel.find({ ...keyword});
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



  async deleteById(id: string): Promise<Book> {
   const deletedBook = await this.bookmodel.findByIdAndDelete(id);
   if (!deletedBook) {
     throw new NotFoundException(`Book not found`);
   }
   return deletedBook;
  }
    
   
}
