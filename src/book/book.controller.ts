/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { SwaggerResponseType } from 'src/common/type/swagger-response.type';
import { AllBookResponseDTO } from './dto/allbook-response.dto';

@ApiTags('Book')
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}
    @ApiOkResponse({ type: SwaggerResponseType(AllBookResponseDTO,true)})
    @ApiQuery({ name: 'keyword', type: String, required: false, description: 'Keyword by which you want to search' })
    @ApiQuery({ name: 'page', type: Number, required: false, description: 'Page no' })
    @Get()
    async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
        return this.bookService.findAll(query);
    }

    @ApiSecurity('JWT-AUTH')
    @UseGuards(AuthGuard())
    @Post()
    async createBook(
        @Body()
        book: CreateBookDto,

        @Req() req
    ,): Promise<Book> {
        return this.bookService.create(book, req.user);
    }
 
    @ApiSecurity('JWT-AUTH')
    @UseGuards(AuthGuard())
    @Get(':id')
    async getBook(
        @Param('id')
        id : string
    ): Promise<Book> {
        return this.bookService.findById(id);
    }

    @ApiSecurity('JWT-AUTH')
    @UseGuards(AuthGuard())
    @Put(':id')
    async updateBook(
        @Param('id')
        id : string,
        @Body()
        book: UpdateBookDto

    ): Promise<Book> {
        return this.bookService.updateById(id, book);
    }


    @ApiSecurity('JWT-AUTH')
    @UseGuards(AuthGuard())
    @Delete(':id')
    async deleteBook(
        @Param('id')
        id: string
    ): Promise<Book> {
        return this.bookService.deleteById(id);
    }

}
