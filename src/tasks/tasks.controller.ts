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
    Put, Query
} from '@nestjs/common';
import {TasksService} from './tasks.service'
import {TaskDTO} from './DTO/taskDTO'
import {ITask} from "./interfaces/ITask";

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) {
    }

    @Get()
    async getTasks(): Promise<ITask[]> {
        return await this.taskService.getTasks()
    }

    @Get(':taskId')
    async getTask(@Query('taskId') taskId: string): Promise<ITask> {
        const task = await this.taskService.getTask(taskId)
        if (!task) throw new NotFoundException('this task does not exist')
        return task
    }

    @Post()
    async createTask(@Body() task: TaskDTO): Promise<ITask> {
        if (!task.title) throw new HttpException('title field is required', HttpStatus.BAD_REQUEST)
        return await this.taskService.createTask(task)
    }

    @Put(':taskId')
    async updateTask(@Param('taskId') taskId, @Body() task: TaskDTO): Promise<ITask> {
        const _task = await this.taskService.updateTask(taskId, task)
        console.log(_task)
        if (!_task) throw new NotFoundException('this task does not exist')
        return _task
    }

    @Delete(':taskId')
    async deleteTask(@Param('taskId') taskId: string): Promise<ITask> {
        const task = await this.taskService.deleteTask(taskId)
        if (!task) throw new NotFoundException('this task does not exist')
        return task
    }

}
