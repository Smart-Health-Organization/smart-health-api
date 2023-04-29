export interface PdfManipulatorOperations {
  readPdf(file): Promise<string[]>;
}
