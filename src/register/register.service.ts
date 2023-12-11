import { Injectable } from '@nestjs/common';
import * as md5 from 'md5';

import { getModelForClass } from '@typegoose/typegoose';
import { User } from 'src/scheme/User';

@Injectable()
export class RegisterService {
  async handleRegister(
    userName: string,
    password: string,
    email: string,
  ): Promise<string> {
    const RegisterModel = getModelForClass(User); // Create UserModel

    if (!userName || !password || !email) {
      // Check if username or password is missing, throw error if true
      return JSON.stringify({ msg: 'Missing parameters' });
    } else {
      if (
        password.length > 8 &&
        email.match('^[A-Za-z0-9]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$') // Check if email is valid
      ) {
        // Hash the password
        const hashedPassword: string = md5(password);
        try {
          // Create a new user
          const document = await RegisterModel.create({
            username: userName,
            password: hashedPassword,
            email: email,
          });
          return JSON.stringify(document); // Return the user
        } catch (err) {
          if (err.code === 11000) {
            // If username is occupied, throw error
            return JSON.stringify({ msg: 'Username occupied' });
          }
        }
      }
      return JSON.stringify({ msg: 'Username or email is invalid' }); // If username or email is invalid, throw error
    }
  }
}
