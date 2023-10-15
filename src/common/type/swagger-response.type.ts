/* eslint-disable prettier/prettier */
import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

class BaseClass {
  @ApiProperty({ default: 'number' })
  statusCode: number;

  @ApiProperty({ default: 'string' })
  type: string;
}

function createResponseType<T>(clazz: Type<T>, isArray = false) {
  const className = clazz.name;

  class Data extends BaseClass {
    @ApiProperty(isArray ? { type: [clazz] } : { type: clazz })
    data: T | T[];
  }

  Object.defineProperty(Data, 'name', {
    value: `${className}${isArray ? 'DataSet' : 'Data'}`,
  });

  return Data;
}

export const SwaggerResponseType = <T>(
  clazz: Type<T>,
  isArray = false,
): Type<any> => createResponseType(clazz, isArray);
