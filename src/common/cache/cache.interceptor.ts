import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // こういうようなキャッシュ関連の実装もinterceptorでやることができる（ただの一例だが）
    const isCached = true;
    if (isCached) {
      return of([]);
    }
    return next.handle();
  }
}
