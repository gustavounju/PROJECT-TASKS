// import { Injectable, NotFoundException } from '@nestjs/common';
// import { Task } from '../domain/task.model';
//
// @Injectable()
// export class TasksService {
//   private tasks: Task[] = []; // Inicializado como arreglo vacío
//
//   createTask(title: string, description: string): Task {
//     const id = this.tasks.length + 1;
//     const task: Task = {
//       id,
//       title,
//       description,
//       status: 'OPEN',
//     };
//     this.tasks.push(task);
//     return task;
//   }
//
//   getAllTasks(): Task[] {
//     return this.tasks;
//   }
//
//   findTask(taskId: number): Task | undefined {
//     return this.tasks.find((task) => task.id === taskId);
//   }
//
//   updateTask(
//     id: number,
//     title: string,
//     description: string,
//     status: 'OPEN' | 'DONE',
//   ): Task {
//     const task = this.tasks.find((task) => task.id === id);
//     if (!task) throw new NotFoundException(`Task with id ${id} not found`);
//     task.title = title;
//     task.description = description;
//     task.status = status;
//     return task;
//   }
//
//   deleteTask(id: number): string {
//     const index = this.tasks.findIndex((task) => task.id === id);
//     if (index === -1) throw new NotFoundException(`Task with id ${id} not found`);
//
//     const deleted = this.tasks.splice(index, 1)[0]; // obtenemos la tarea eliminada
//     return `Tarea con id ${deleted.id} eliminada correctamente`;
//   }
// }
import { Injectable } from '@nestjs/common';
import { Task } from '../entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  findOne(id: number): Promise<Task | null> {
    return this.tasksRepository.findOneBy({ id });
  }

  async create(taskData: Partial<Task>): Promise<Task> {
    const task = this.tasksRepository.create(taskData);
    return this.tasksRepository.save(task);
  }

  async update(id: number, taskData: Partial<Task>): Promise<Task | null> {
    await this.tasksRepository.update(id, taskData);
    return this.tasksRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}