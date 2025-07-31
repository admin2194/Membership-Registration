import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('v1');
  
  // Configure CORS to allow all frontend origins
  app.enableCors({
    origin: true, // Allow all origins for now
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'X-Requested-With',
      'Accept',
      'Origin'
    ],
    exposedHeaders: ['Content-Length', 'X-Requested-With'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  });
  
  await app.listen(process.env.PORT || 3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log('CORS enabled for all origins');
}
bootstrap();
