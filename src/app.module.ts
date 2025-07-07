import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksService } from './tasks/tasks.service';
import { TasksController } from './tasks/tasks.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ProductController } from './products/product.controller';
import { ProductService } from './products/product.service';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysql',
      database: 'todo-system',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // ¡Cuidado! Solo para desarrollo, en producción usar migraciones
    }),
    TypeOrmModule.forFeature([Task, Product]),
  ],
  controllers: [AppController, TasksController, ProductController],
  providers: [AppService, TasksService, ProductService],
})
export class AppModule {}
