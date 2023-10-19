import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {} from '../database/data-source'
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const logger = new Logger()
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const port = configService.get('app.port')
  await app.listen(port,()=>{
       logger.log(`server listen on port ${port}`)
  });
}
bootstrap();
