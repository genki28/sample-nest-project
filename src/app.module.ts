import {
  MiddlewareConsumer,
  Module,
  NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
// import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { LoggingInterceptor } from './common/logging/logging.interceptor';
import {
  // LoggerMiddleware,
  logger,
} from './common/middleware/logger.middleware';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PostService } from './post/post.service';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    UserService,
    PostService,
  ],
  imports: [CatsModule],
  controllers: [UserController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('cats');
    // 以下のようにmethodでも絞ることができるしワイルドカードなども使える
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'cats', method: RequestMethod.GET });

    // さらに上記の書き方だとちょっとビミョいが以下のようにController classを渡すこともできる
    // consumer.apply(LoggerMiddleware).forRoutes(CatsController);

    // そして、除外もできる
    // consumer
    //   .apply(LoggerMiddleware)
    //   .exclude(
    //     { path: 'cats', method: RequestMethod.GET },
    //     { path: 'cats', method: RequestMethod.POST },
    //     'cats/(.*)',
    //   )
    //   .forRoutes(CatsController);

    // 順次実行するには以下のようにする
    // consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
    consumer.apply(logger).forRoutes('cats');
  }
}
