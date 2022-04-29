// ホワイトリスト登録できるらしい

import { IsInt, IsString } from 'class-validator';

// https://docs.nestjs.com/controllers#request-payloads
export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
