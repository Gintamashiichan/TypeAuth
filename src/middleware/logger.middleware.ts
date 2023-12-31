import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `${req.ip} ${req.method} ${req.originalUrl} ${res.statusCode}`, // Log the request IP, method, URL, and status code
    );
    next();
  }
}
