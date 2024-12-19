import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger: Logger = new Logger();
  const app = await NestFactory.create(AppModule);
  
  await app.listen(process.env.PORT);

  if(process.env.PRODUCTION == 'false') {
    logger.debug(`Servidor rodando em http://localhost:${process.env.PORT}`)
  } else {
    logger.debug(`Servidor rodando em produção.`)
  }
}
bootstrap();
