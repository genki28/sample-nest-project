import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
// import { ObjectSchema } from 'joi';

// @Injectable()
// export class JoiValidationPipe implements PipeTransform {
//   constructor(private schema: ObjectSchema) {}

//   transform(value: any) {
//     const { error } = this.schema.validate(value);
//     if (error) {
//       throw new BadRequestException('Validation Failed');
//     }
//     return value;
//   }
// }

@Injectable()
// anyじゃないようにしたいな〜
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
