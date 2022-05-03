import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * 例えば、以下のように実装するイメージ
 * @Get()
 * async findOne(@User() user: UserEntity) {
 *  console.log(user)
 * }
 */
// export const User = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     return request.user;
//   },
// );

/**
 * 例えば、以下みたいに使える
 * @Get()
 * async findOne(@User('firstName') firstName: string) {
 *  console.log(`Hello ${firstName}`)
 * }
 *
 * なお、
 * TypeScriptユーザーの場合、これは一般的なものであることに注意してくださいcreateParamDecorator<T>()。これは、たとえば、型安全性を明示的に適用できることを意味しますcreateParamDecorator<string>((data, ctx) => ...)。または、ファクトリ関数でパラメータタイプを指定します（例：）createParamDecorator((data: string, ctx) => ...)。両方を省略すると、のタイプはdataになりますany。
 */
export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
