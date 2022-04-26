import { Global, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global() // MEMO: モジュールをグローバルスコープにすることもできる
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  // MEMO: Every module is automatically a shared module. Once created it can be reused by any module. Let's imagine that we want to share an instance of the CatsService between several other modules. In order to do that, we first need to export the CatsService provider by adding it to the module's exports array, as shown below:
  exports: [CatsService],
})
export class CatsModule {}

// 以下みたいなこともできる
// @Module({
//   controllers: [CatsController],
//   providers: [CatsService],
// })
// export class CatsModule {
//   constructor(private catsService: CatsService)
// }
