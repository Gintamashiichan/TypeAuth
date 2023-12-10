import { Body, Controller, Post } from '@nestjs/common';

import { RegisterService } from './register.service';
import { UserDto } from 'src/dtos/user.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async createUser(@Body() registerDto: UserDto): Promise<string> {
    return this.registerService.handleRegister(
      registerDto.username,
      registerDto.password,
      registerDto.email,
    );
  }
}
