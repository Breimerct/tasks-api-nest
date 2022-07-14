import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from './schemas/task.schema'
import {TaskMiddleware} from "./middleware/task.middleware";

@Module({
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(TaskMiddleware)
        .forRoutes('tasks')
  }
}
