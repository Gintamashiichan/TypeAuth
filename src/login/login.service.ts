import { Injectable } from '@nestjs/common';
import * as md5 from 'md5';
import * as jwt from 'jsonwebtoken';

import { getModelForClass } from '@typegoose/typegoose';
import { User } from 'src/scheme/User';

@Injectable()
export class LoginService {
  async handleLogin(userName: string, password: string): Promise<string> {
    const LoginModel = getModelForClass(User);
    if (!userName || !password) {
      return JSON.stringify({ msg: 'Missing parameters' });
    } else {
      const hashedPassword: string = md5(password);
      const document = await LoginModel.findOne({
        username: userName,
        password: hashedPassword,
      }).exec();
      if (!document) {
        return JSON.stringify({ msg: 'Username or password is incorrect' });
      }
      const token = jwt.sign(
        {
          id: document?.id,
          reqID: Math.random().toString(36).slice(2),
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        `${process.env.JWT_SECRECT}-${document?.id}`,
      );
      const refreshToken = jwt.sign(
        {
          userToken: token,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 7,
        },
        `${process.env.JWT_SECRECT}`,
      );
      return JSON.stringify({
        token: token,
        refreshToken: refreshToken,
      });
    }
  }
}
