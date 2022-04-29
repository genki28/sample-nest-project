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
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ForbiddenException } from '../common/exceptions/forbidden.exception';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

// @Controller({ host: 'cats.example.com' }) // サブドメインの場合は、こんな感じすれば良いらしい

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  create(@Body() createCatDto: CreateCatDto): void {
    this.catsService.create(createCatDto);
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
