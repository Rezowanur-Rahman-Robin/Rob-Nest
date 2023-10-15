/* eslint-disable prettier/prettier */
import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export class SwaggerConfig {
    public static setupSwagger(app: INestApplication){
        const options = new DocumentBuilder()
           .setTitle('Rob Nestjs API')
           .setDescription("Just for learning purposes..")
           .setVersion('1.0.0')
           .addBearerAuth({
            type:'http',
            scheme: 'bearer',
            bearerFormat:'JWT',
            name: 'JWT',
            description:'Enter JWT Token',
            in:'header',
           },
           'JWT-AUTH',
           )
           .build();

        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('docs',app,document)
    }
}