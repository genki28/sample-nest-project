import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  // HttpException,
  // HttpStatus,
  Param,
  Post,
  Query,
  Redirect,
  UseFilters,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { ForbiddenException } from '../common/exceptions/forbidden.exception';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

// @Controller({ host: 'cats.example.com' }) // サブドメインの場合は、こんな感じすれば良いらしい

// class内で定義されたすべてのルートハンドラーに対して設定できる(main.ts(エントリーポイント)にてすべてのルートハンドラーに対して設定することもできる)
// @UseFilters(new HttpExceptionFilter())
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  @UseFilters(HttpExceptionFilter) // 可能な場合は、インスタンスではなくクラスを使用してフィルターを適用した方が良いみたい！なぜなら、Nestはモジュール全体で同じクラスのインタスタンスを再利用できるため、メモリ使用量が削減されるため
  create(@Body() createCatDto: CreateCatDto): void {
    try {
      this.catsService.create(createCatDto);
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }

  @Get('ab*cd')
  findPattern(): string {
    return 'This route uses a wildcard';
  }

  @Get('promise')
  async findPromise(): Promise<string> {
    return new Promise((resolve) => resolve('This route uses a Promise'));
  }

  @Get('observable')
  findObservable(): Observable<string> {
    return of('This route uses a Observable');
  }

  @Get(':id')
  findOne(@Param() params): string {
    if (!params.id) {
      // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      // 以下みたいにオーバーライドすることも可能
      // だが、カスタムするなら独自の例外階層を作成した方が良いみたい! 例: forbidden.exception.tsを作るとか
      // throw new HttpException(
      //   {
      //     status: HttpStatus.FORBIDDEN,
      //     error: 'This is a custom message',
      //   },
      //   HttpStatus.FORBIDDEN,
      // );
      throw new ForbiddenException();
    }
    return `This actions returns a #${params.id} cat`;
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
