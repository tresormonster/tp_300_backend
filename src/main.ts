import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { join } from 'path';
import * as express from 'express';

async function bootstrap() {

  const app =
    await NestFactory.create(
      AppModule,
    );

  app.use(
  '/uploads',
  (req, res, next) => {

    res.header(
      'Access-Control-Allow-Origin',
      '*',
    );

    res.header(
      'Access-Control-Allow-Headers',
      '*',
    );

    next();
  },

  express.static(
    join(process.cwd(), 'uploads'),
  ),
);

 app.enableCors({
  origin: true,
  credentials: true,
});
  const config =
      new DocumentBuilder()

    .setTitle(
      'Gestion Notes API',
    )

    .setDescription(
      'API pour gestion des étudiants',
    )

    .setVersion('1.0')

    .build();

  const document =
      SwaggerModule.createDocument(
    app,
    config,
  );

  SwaggerModule.setup(
    'api',
    app,
    document,
  );

  await app.listen(
    process.env.PORT ?? 3000,
  );
}

bootstrap();