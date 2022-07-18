import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDTO } from './DTO/taskDTO';
import { ITask } from './interfaces/ITask';
import { ValidateIdPipe } from './pipes/validate-id.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post('/create')
  async createTask(@Body() task: TaskDTO): Promise<ITask> {
    if (!task.title)
      throw new HttpException(
        'title field is required',
        HttpStatus.BAD_REQUEST,
      );
    return await this.taskService.createTask(task);
  }

  @Get()
  async getTasks(): Promise<ITask[]> {
    return await this.taskService.getTasks();
  }

  @Get(':taskId')
  async getTask(
    @Param('taskId', ValidateIdPipe) taskId: string,
  ): Promise<ITask> {
    const task = await this.taskService.getTask(taskId);
    if (!task) throw new NotFoundException('this task does not exist');
    return task;
  }

  @Put('/update/:taskId')
  async updateTask(
    @Param('taskId', ValidateIdPipe) taskId,
    @Body() task: TaskDTO,
  ): Promise<ITask> {
    const _task = await this.taskService.updateTask(taskId, task);
    if (!_task) throw new NotFoundException('this task does not exist');
    return _task;
  }

  @Delete('/delete/:taskId')
  async deleteTask(
    @Param('taskId', ValidateIdPipe) taskId: string,
  ): Promise<ITask> {
    const task = await this.taskService.deleteTask(taskId);
    if (!task) throw new NotFoundException('this task does not exist');
    return task;
  }
}
