import { Injectable } from '@nestjs/common';
import { Operations } from './pdf-manipulator.operations';

@Injectable()
export class PdfManipulatorService implements Operations {
  readPdf(): string {
    return 'Hello World!!!!';
  }
}
