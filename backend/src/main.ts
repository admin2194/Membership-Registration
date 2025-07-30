import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Set global prefix for API versioning
  app.setGlobalPrefix('v1');
  
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://apieyeamembership.eyea.et',
    credentials: true,
  });
  
  await app.listen(process.env.PORT || 3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
