import {
  MiddlewareConsumer,
  Module,
  NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import {
  // LoggerMiddleware,
  logger,
} from './common/middleware/logger.middleware';

@Module({
  imports: [CatsModule],
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
