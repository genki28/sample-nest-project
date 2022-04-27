// import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log(`Request...: ${req}`);
//     next();
//   }
// }

// 上記のようなclassベースではなく、以下のようなfunctionベースでもおk
// TODO: というよりもミドルウェアに依存関係が必要なければよりシンプルな以下のfunctionベースでのミドルウェアを使用する方が良いみたい = シンプルなので
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request: ${req}`);
  next();
}
