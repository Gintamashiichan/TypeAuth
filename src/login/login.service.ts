import { Injectable } from '@nestjs/common';
import * as md5 from 'md5';
import * as jwt from 'jsonwebtoken';

import { getModelForClass } from '@typegoose/typegoose';
import { User } from 'src/scheme/User';
import { Token } from 'src/scheme/Token';

@Injectable()
export class LoginService {
  async handleLogin(userName: string, password: string): Promise<string> {
    const LoginModel = getModelForClass(User); // UserModel is a regular Mongoose Model with correct types

    if (!userName || !password) {
      // Check if username or password is missing, throw error if true
      return JSON.stringify({ msg: 'Missing parameters' });
    } else {
      const hashedPassword: string = md5(password); // Hash the password

      const document = await LoginModel.findOneAndUpdate({
        // Find the user and update the lastLogin field
        username: userName,
        password: hashedPassword,
        lastLogin: new Date().getTime(),
      });
      if (!document) {
        // If username or password is incorrect, throw error
        return JSON.stringify({ msg: 'Username or password is incorrect' });
      }

      // Create a JWT token and a refresh token
      const token = jwt.sign(
        {
          id: document?.id,
          reqID: Math.random().toString(36).slice(2), // Generate a random string
          exp: Math.floor(Date.now() / 1000) + 60 * 60, // expire in 1 hour
        },
        `${process.env.JWT_SECRECT}-${document?.id}`, // Secret key
      );
      const refreshToken = jwt.sign(
        {
          userToken: token, // The JWT token created above
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 7, // expire in 7 hours
        },
        `${process.env.JWT_SECRECT}`, // Secret key
      );

      const TokenModel = getModelForClass(Token); // Create TokenModel

      await TokenModel.findOneAndDelete({ username: document?.username }); // Delete the old token

      const tokenDocument = await TokenModel.create({
        // Create a new token
        userToken: token,
        refreshToken: refreshToken,
        username: document?.username,
      });

      return JSON.stringify(tokenDocument); // Return the token
    }
  }
}
