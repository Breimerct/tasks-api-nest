import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({versionKey: false})
export class Task {

    @Prop({required: true, unique: true})
    title: string;

    @Prop()
    description: string;

    @Prop()
    done: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);