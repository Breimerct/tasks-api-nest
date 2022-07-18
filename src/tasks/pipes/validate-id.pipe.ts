import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ValidateIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!Types.ObjectId.isValid(value))
      throw new BadRequestException(`invalid ID: ${value}`);
    return value;
  }
}
