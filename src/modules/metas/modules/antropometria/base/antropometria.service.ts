import { Injectable } from '@nestjs/common';
import { AntropometriaOperations } from './antropometria.operations';

@Injectable()
export class AntropometriaService implements AntropometriaOperations {
  getHello(): string {
    return 'Hello World!!!!';
  }
}
