import { RemoveEmpty } from '@app/utils/remove-empry';
import { Injectable } from '@nestjs/common';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { TextItem } from 'pdfjs-dist/types/src/display/api';
import { PdfManipulatorOperations } from './pdf-manipulator.operations';

@Injectable()
export class PdfManipulatorService implements PdfManipulatorOperations {
  private async transformPagesToFormattedStrings(pdf: any): Promise<string[]> {
    let pdfPages: string[] = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const lines = RemoveEmpty(
        content.items.map((item: TextItem) => item?.str.toUpperCase() || ''),
      );
      pdfPages.push(lines.join(' '));
    }
    return pdfPages;
  }

  async readPdf(file: any): Promise<string[]> {
    const buffer = Uint8Array.from(file.buffer);
    const pdf = (await pdfjsLib.getDocument(buffer)
      .promise) as pdfjsLib.PDFDocumentProxy;
    const pdfPagesStringArray = await this.transformPagesToFormattedStrings(
      pdf,
    );

    return pdfPagesStringArray;
  }
}
