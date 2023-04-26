import { Inject, Injectable } from '@nestjs/common';
import { Operations } from './pdf-manipulator.operations';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { TextItem } from 'pdfjs-dist/types/src/display/api';
import { RemoveEmpty } from '@app/utils/remove-empry';
import { MetricaOperations } from '@modules/metrica/metrica.operations';
import { Tokens } from '@app/utils/tokens';
import { clearConfigCache } from 'prettier';

@Injectable()
export class PdfManipulatorService implements Operations {
  constructor(
    @Inject(Tokens.METRICA_OPERATIONS)
    private readonly metricaService: MetricaOperations,
  ){}

  async readExamesBasedOnMetricas(file: any) {

    let metricas = await this.metricaService.getMetricas();
    const metricasByName = metricas.map(metrica =>{
      return metrica.nome
    } )
    const map = new Map<string,string>;
    const buffer = Uint8Array.from(file.buffer);
    const pdf = await pdfjsLib.getDocument(buffer).promise as pdfjsLib.PDFDocumentProxy;
    const pdfPagesStringArray = await this.transformPagesToFormattedStrings(pdf);
    let itemEncontrado = '';
    for (let i = 0; i < pdfPagesStringArray.length; i++) {
      for (let j = 0; j < metricasByName.length; j++) {
        if (pdfPagesStringArray[i].includes(metricasByName[j])) {
          itemEncontrado = metricasByName[j];
          break;
        }
      }
      if (itemEncontrado !== '') {
        const regex = new RegExp(`${itemEncontrado}.*?R\\s*E\\s*S\\s*U\\s*L\\s*T\\s*A\\s*D\\s*O\\s*:\\s*(\\d+)|${itemEncontrado}.*?\\bR\\s*E\\s*S\\s*U\\s*L\\s*T\\s*A\\s*D\\s*O\\s*(\\d+)`, "gi");

        const match = regex.exec(pdfPagesStringArray[i]);
        if (match) {
          const valor = match[1] || match[2];
          map.set(itemEncontrado, valor);
        }

      }
    }
    return map;
  }

  async transformPagesToFormattedStrings(pdf: any): Promise<string[]>{
    let pdfPages : string[]= [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const lines = RemoveEmpty(content.items.map((item: TextItem) => item?.str || ''));
      pdfPages.push(lines.join(' ')); 

    }
    return pdfPages

  }
}
