import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { LoggingInterceptor } from './common/logging/logging.interceptor';
import { logger } from './common/middleware/logger.middleware';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

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
  ],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // 諸々の設定可能
      // debug: false,
      // playground: false,
    }),
  ],
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
