import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';

import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { AppService } from './app.service';

import { RegisterController } from './register/register.controller';
import { LoginController } from './login/login.controller';

import { LoggerMiddleware } from './middleware/logger.middleware';
import { CaptchaMiddleware } from './middleware/captcha.middleware';

@Module({
  imports: [],
  controllers: [AppController, RegisterController, LoginController],
  providers: [AppService, RegisterService, LoginService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*')
      .apply(CaptchaMiddleware)
      .forRoutes(LoginController, RegisterController);
  }
}
