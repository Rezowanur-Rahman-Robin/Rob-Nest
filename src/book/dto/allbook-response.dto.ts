/* eslint-disable prettier/prettier */
import { BaseResponseDTO } from "src/common/dto/base-response.dto";
import { ApiResponseProperty } from '@nestjs/swagger';

export class AllBookResponseDTO extends BaseResponseDTO{
    @ApiResponseProperty()
    title:string;

    @ApiResponseProperty()
    description:string


    @ApiResponseProperty()
    author:string


    @ApiResponseProperty()
    price:number

    @ApiResponseProperty()
    category: string

    @ApiResponseProperty()
    user: string;
}