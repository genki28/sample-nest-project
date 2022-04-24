// ホワイトリスト登録できるらしい
// https://docs.nestjs.com/controllers#request-payloads
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
