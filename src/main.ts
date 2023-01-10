import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule);

  //prefijo global para el API: /api/pokemon
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    /// los siguientes transformadores consumen memoria extra por lo que es opcional, 
    /// tendria que transformar todos los parametros que ingresan desde el controler o service
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));

  await app.listen(process.env.PORT);
}
main();
