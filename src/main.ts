import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectMongoose } from './libs/mongooseController';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  process.env.JWT_SECRECT = Math.random().toString(36).slice(2);
  console.log(process.env.JWT_SECRECT);
  await connectMongoose(
    'typeauth.wbdxn8p.mongodb.net',
    'Gintamashiichan',
    'ycS9OwvgAIExfojW',
    'Data',
    true,
  );
  await app.listen(3000);
}
bootstrap();
