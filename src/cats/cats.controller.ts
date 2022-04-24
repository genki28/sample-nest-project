import { Controller, Get, Header, HttpCode, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  @HttpCode(201)
  @Header('Cache-Control', 'none')
  create(): string {
    return 'This actions adds a new cat';
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get('ab*cd')
  findPattern(): string {
    return 'This route uses a wildcard';
  }
}
