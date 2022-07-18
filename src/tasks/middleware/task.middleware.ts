import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TaskMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('params', req.params);
    // if (!req.params.taskId) throw new HttpException('', 500);
    next();
  }
}
