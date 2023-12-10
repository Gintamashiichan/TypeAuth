import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { AppService } from './app.service';

import { RegisterController } from './register/register.controller';
import { LoginController } from './login/login.controller';

@Module({
  imports: [],
  controllers: [AppController, RegisterController, LoginController],
  providers: [AppService, RegisterService, LoginService],
})
export class AppModule {}
