import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

@Injectable()
export class CaptchaMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { reCaptchatoken } = req.body; // Get the reCaptcha token from the request body
    const { data } = await axios({
      url: 'https://www.google.com/recaptcha/api/siteverify', // Send a POST request to Google's reCaptcha API
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: `secret=${process.env.reCaptchaSecrect}&response=${reCaptchatoken}`,
    });
    if (data && data.success) {
      // If the reCaptcha token is valid, continue
      next();
    } else {
      res.send(JSON.stringify({ msg: 'Captcha failed' })); // If the reCaptcha token is invalid, throw error
    }
  }
}
