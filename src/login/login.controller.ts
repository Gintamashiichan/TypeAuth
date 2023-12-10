import { Body, Controller, Post } from '@nestjs/common';

import { UserDto } from 'src/dtos/user.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async createUser(@Body() loginDto: UserDto): Promise<string> {
    return this.loginService.handleLogin(loginDto.username, loginDto.password);
  }
}
