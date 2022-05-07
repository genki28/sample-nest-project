import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';
import { Cat, Prisma } from '@prisma/client';

@Injectable()
export class CatsService {
  constructor(private prisma: PrismaService) {}

  create(cat: Prisma.CatCreateInput) {
    return this.prisma.cat.create({
      data: cat,
    });
  }

  findAll(): Promise<Cat[]> {
    return this.prisma.cat.findMany();
  }
}
