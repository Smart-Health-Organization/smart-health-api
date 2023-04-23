import { RemoveEmpty } from '@app/utils/remove-empry';
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { TextItem } from 'pdfjs-dist/types/src/display/api';

@Controller('pdf-manipulator')
export class PdfManipulatorController {
  constructor(
    
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async readLines(@UploadedFile() file) {
  
    const buffer = Uint8Array.from(file.buffer);
    const pdf = await pdfjsLib.getDocument(buffer).promise as pdfjsLib.PDFDocumentProxy;
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const lines = RemoveEmpty(content.items.map((item: TextItem ) => item?.str || ''));
      const pageText = lines.join(' ');
      console.log(`=== PAGINA ${i} ===`)
      lines.forEach((line: string) => {
        console.log(line);
      });
    }
  }
}
