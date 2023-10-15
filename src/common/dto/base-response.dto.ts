/* eslint-disable prettier/prettier */
import { ApiResponseProperty } from '@nestjs/swagger';

export class BaseResponseDTO {
  @ApiResponseProperty()
  created_at: Date;

  @ApiResponseProperty()
  updated_at: Date;

}
