import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger: Logger = new Logger();
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('')
    .setDescription('')
    .setVersion('')
    .build()
  const theme = new SwaggerTheme()

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    customCss: theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK)
  });
  
  await app.listen(process.env.PORT);

  if(process.env.PRODUCTION == 'false') {
    logger.debug(`Servidor rodando em http://localhost:${process.env.PORT}.`);
  } else {
    logger.debug(`Servidor rodando em produção.`);
  }
}
bootstrap();
