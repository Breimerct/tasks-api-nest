import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose'
import {ITask} from "./interfaces/ITask";
import {Task} from './schemas/task.schema'
import {InjectModel} from "@nestjs/mongoose";
import {TaskDTO} from "./DTO/taskDTO";

@Injectable()
export class TasksService {

    constructor(@InjectModel(Task.name) private taskModel: Model<ITask>) {
    }

    async getTasks(): Promise<ITask[]> {
        return this.taskModel.find();
    }

    async getTask(id: string): Promise<ITask> {
        try {
            return await this.taskModel.findById(id)
        } catch (error) {
            return error
        }
    }

    async createTask(task: TaskDTO): Promise<ITask> {
        try {
            return await this.taskModel.create(task)
        } catch (error) {
            return error
        }
    }

    async updateTask(id: string, _task: TaskDTO): Promise<ITask> {
        try {
            return await this.taskModel.findByIdAndUpdate(id, _task, {
                new: true
            })
        } catch (error) {
            return error
        }
    }

    async deleteTask(id: string): Promise<ITask> {
        try {
            return await this.taskModel.findByIdAndDelete(id)
        } catch (error) {
            return error
        }
    }


}
