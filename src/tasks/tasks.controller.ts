// import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
// import { TasksService } from './tasks.service';
// import { Task } from '../domain/task.model';
// import { CreateTaskDto } from '../dto/create-task.dto';
//
// @Controller('tasks')
// export class TasksController {
//   constructor(private readonly tasksService: TasksService) {}
//
//   @Post()
//   createTask(@Body() createTaskDto: CreateTaskDto): Task {
//     return this.tasksService.createTask(
//       createTaskDto.title,
//       createTaskDto.description,
//     );
//   }
//
//   @Get()
//   getAllTasks(): Task[] {
//     return this.tasksService.getAllTasks();
//   }
//
//   @Get(':taskId')
//   findTask(@Param('taskId') taskId: string): Task | undefined {
//     return this.tasksService.findTask(Number(taskId));
//   }
//
//   @Delete(':id')
//   deleteTask(@Param('id') id: string): string {
//     return this.tasksService.deleteTask(Number(id));
//   }
//
//   @Put(':id')
//   updateTask(
//     @Param('id') id: string,
//     @Body() updateTaskDto: CreateTaskDto & { status: 'OPEN' | 'DONE' },
//   ): Task {
//     return this.tasksService.updateTask(
//       Number(id),
//       updateTaskDto.title,
//       updateTaskDto.description,
//       updateTaskDto.status,
//     );
//   }
// }
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '../domain/task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task | null> {
    return this.tasksService.findOne(+id);
  }

  @Post()
  create(@Body() taskData: Partial<Task>): Promise<Task> {
    return this.tasksService.create(taskData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() taskData: Partial<Task>): Promise<Task | null> {
    return this.tasksService.update(+id, taskData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(+id);
  }
}
