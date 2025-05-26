import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '../domain/task.model';
import { CreateTaskDto } from '../dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(
      createTaskDto.title,
      createTaskDto.description,
    );
  }

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get(':taskId')
  findTask(@Param('taskId') taskId: string): Task | undefined {
    return this.tasksService.findTask(Number(taskId));
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): string {
    return this.tasksService.deleteTask(Number(id));
  }

  @Put(':id')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: CreateTaskDto & { status: 'OPEN' | 'DONE' },
  ): Task {
    return this.tasksService.updateTask(
      Number(id),
      updateTaskDto.title,
      updateTaskDto.description,
      updateTaskDto.status,
    );
  }
}
