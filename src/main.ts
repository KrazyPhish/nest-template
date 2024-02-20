import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform/transfrom.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())

  // 注册全局管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 当设置为 true 时，这将自动删除非白名单属性(在验证类中没有任何修饰符的属性)。提示：如果没有其他装饰器适合您的属性，请使用 @Allow 装饰器。
      transform: true, // 当设置为 true 时，class-transformer 将尝试根据 TS 反映的类型进行转换
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const configService = app.get(ConfigService)

  await app.listen(configService.get('PORT', 3000));
}

bootstrap();
