import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
   
    const { metatype } = metadata
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    
    const object = plainToInstance(metatype, value);
    const errors = await validate(object,{ stopAtFirstError: true });
    if (errors.length > 0) {
      throw new BadRequestException({
         message: 'Validation Error',
         errors:   errors
      });
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const  types: Function[] = [String, Boolean, Number, Array, Object, User];
    return !types.includes(metatype);
  }
}