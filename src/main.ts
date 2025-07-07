import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { join } from 'path';

async function bootstrap() {
  dotenv.config();
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  console.log(
    '******* procces.env.DIRECTORY_UPLOADS: ',
    process.env.DIRECTORY_UPLOADS,
  );
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: `/uploads`, // URL pública, se podra acceder a la imagen asi: http://localhost:3000/uploads/product-1751641392519-904588899.jpg
  });
  // app.setGlobalPrefix('api/v1');
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Productos API')
    .setDescription('CRUD de productos con imagen')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // accedés por /api
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
