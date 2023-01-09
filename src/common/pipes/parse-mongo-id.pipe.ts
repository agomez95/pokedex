import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {

  transform(value: string, metadata: ArgumentMetadata) {

    // Mediante este Custom Pipe podemos verificar lo que entra desde el controller que en este caso es el id
    if(!(isValidObjectId(value))) throw new BadRequestException(`${value} is not a valid MongoId`)

    return value;
  }

}
