export interface PdfManipulatorOperations {
  readPdf(file: any): Promise<string[]>;
}
