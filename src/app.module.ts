import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';

// Services
import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { AppService } from './app.service';
import { RevokeTokenService } from './revoke-token/revoke-token.service';

// Controllers
import { RegisterController } from './register/register.controller';
import { LoginController } from './login/login.controller';

// Middleware
import { LoggerMiddleware } from './middleware/logger.middleware';
// import { CaptchaMiddleware } from './middleware/captcha.middleware'; // Uncomment this line to enable captcha
import { RevokeTokenController } from './revoke-token/revoke-token.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    RegisterController,
    LoginController,
    RevokeTokenController,
  ],
  providers: [AppService, RegisterService, LoginService, RevokeTokenService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // .apply(CaptchaMiddleware)
    // .forRoutes(LoginController, RegisterController);
  }
}
