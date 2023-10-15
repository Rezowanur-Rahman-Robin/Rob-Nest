/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';
import { Query  } from 'express-serve-static-core';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class BookService {
    constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>
    ) {}

    async findAll(query : Query): Promise<Book[]>{
        console.log(query)

        //Pagination
        const resPerPage = 2
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        

        //Searching
        const keyword = query.keyword ? {
          "$or":[
            {
                title: {
                    $regex: query.keyword,
                    $options: 'i'
                  }
            },
            {
                author: {
                    $regex: query.keyword,
                    $options: 'i'
                  }
            }
          ]
        } : {}
        const books = await this.bookModel.find({...keyword}).limit(resPerPage).skip(skip);
        return books;
    }

    async create(book: Book, user: User): Promise<Book> {
        const data = Object.assign(book, { user: user._id})
        const res = await this.bookModel.create(data)
        return res;
    }

    async findById(id: string): Promise<Book> {

        const isValidId = mongoose.isValidObjectId(id);
        if(!isValidId){
            throw new BadRequestException('Please enter valid id.')
        }

        const book = await this.bookModel.findById(id);
        if(!book){
            throw new NotFoundException('Book not found.');
        }
        return book;
    }

    async updateById(id: string, book: Book ): Promise<Book> {
        const isValidId = mongoose.isValidObjectId(id);
        if(!isValidId){
            throw new BadRequestException('Please enter valid id.')
        }

        return await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true,
        });
       
    }

    async deleteById(id: string ): Promise<Book> {
        const isValidId = mongoose.isValidObjectId(id);
        if(!isValidId){
            throw new BadRequestException('Please enter valid id.')
        }
        
        return await this.bookModel.findByIdAndDelete(id);
    }
}