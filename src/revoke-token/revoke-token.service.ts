import { Injectable } from '@nestjs/common';

import { getModelForClass } from '@typegoose/typegoose';
import { Token } from 'src/scheme/Token';

@Injectable()
export class RevokeTokenService {
  async handleRegister(refreshToken: string): Promise<string> {
    const TokenModel = getModelForClass(Token); // Create TokenModel

    if (!refreshToken) {
      // Check if refreshToken is missing, throw error if true
      return JSON.stringify({ msg: 'Missing parameters' });
    } else {
      const token = await TokenModel.findOneAndDelete({
        // Find the token and delete it
        refreshToken: refreshToken,
      });
      if (!token) {
        // If token is invalid, throw error
        return JSON.stringify({ msg: 'Invalid credentials' });
      }
      return JSON.stringify({ success: true });
    }
  }
}
