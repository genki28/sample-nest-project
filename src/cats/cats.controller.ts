import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';

// @Controller({ host: 'cats.example.com' }) // サブドメインの場合は、こんな感じすれば良いらしい

@Controller('cats')
export class CatsController {
  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  create(@Body() createCatDto: CreateCatDto): string {
    return `This actions adds a new cat: ${createCatDto}`;
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
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
