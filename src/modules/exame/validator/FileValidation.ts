export const pdfFilter = (req, file, callBack) => {
  if (!file.originalname.match(/\.(pdf)$/)) {
    req.fileValidationError = 'Apenas PDFs são aceitos';
    return callBack(null, false);
  }
  callBack(null, true);
};
