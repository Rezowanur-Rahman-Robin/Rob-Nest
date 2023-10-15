/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
         
  @ApiProperty() 
  @IsNotEmpty()
  @IsEmail({}, { message: "Please Enter Correct Email!"})
  readonly email : string;
      
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password : string;
}