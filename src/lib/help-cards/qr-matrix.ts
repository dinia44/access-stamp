import QRCode from "qrcode";

export type QrMatrix = {
  size: number;
  modules: boolean[][];
};

export function createQrMatrix(value: string): QrMatrix {
  const qr = QRCode.create(value, {
    errorCorrectionLevel: "M",
  });
  const size = qr.modules.size;
  const modules: boolean[][] = [];
  for (let y = 0; y < size; y += 1) {
    const row: boolean[] = [];
    for (let x = 0; x < size; x += 1) {
      row.push(qr.modules.get(y, x) !== 0);
    }
    modules.push(row);
  }
  return { size, modules };
}

export function qrMatrixToSvg(matrix: QrMatrix, moduleSize = 4): string {
  const quiet = 4;
  const dim = (matrix.size + quiet * 2) * moduleSize;
  const rects: string[] = [];
  for (let y = 0; y < matrix.size; y += 1) {
    for (let x = 0; x < matrix.size; x += 1) {
      if (!matrix.modules[y]?.[x]) continue;
      rects.push(
        `<rect x="${(x + quiet) * moduleSize}" y="${(y + quiet) * moduleSize}" width="${moduleSize}" height="${moduleSize}" />`,
      );
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dim} ${dim}" width="${dim}" height="${dim}" role="img" aria-hidden="true" focusable="false"><rect width="${dim}" height="${dim}" fill="#FFF7EF"/><g fill="#13201F">${rects.join("")}</g></svg>`;
}
