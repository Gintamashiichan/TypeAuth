import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

@Injectable()
export class CaptchaMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { reCaptchatoken } = req.body;
    const { data } = await axios({
      url: 'https://www.google.com/recaptcha/api/siteverify',
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: `secret=6LcMoiwpAAAAAKqiqAHXlCtvOeGfshLzLjSq-sq7&response=${reCaptchatoken}`,
    });
    if (data && data.success) {
      next();
    } else {
      res.send(JSON.stringify({ msg: 'Captcha failed' }));
    }
  }
}
