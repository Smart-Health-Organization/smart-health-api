import { Injectable } from '@nestjs/common';
import { Operations } from './base.operations';

@Injectable()
export class BaseService implements Operations {
  getHello(): string {
    return 'Hello World!!!!';
  }
}
