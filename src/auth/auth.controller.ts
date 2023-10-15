/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import {  ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/signup')
    async registerUser(@Body() signUpDto: SignUpDto): Promise< { token: string } >{
        return this.authService.signup(signUpDto)
    }

    @Post('/login')
    async loginUser(@Body() loginDto: LoginDto): Promise< { token: string } >{
        return this.authService.login(loginDto)
    }
}
