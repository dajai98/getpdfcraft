import { validateJpeg } from "@/lib/jpegValidation";

export async function readSupportedImage(file) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const png = [137, 80, 78, 71, 13, 10, 26, 10];
  const type = png.every((byte, i) => bytes[i] === byte) ? "png"
    : bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 ? "jpeg" : null;
  if (!type) throw new Error(`${file.name}: only JPEG/JPG and PNG images are supported.`);
  // Check complete JPEG structure as well as the embedding library headers.
  const { PDFDocument } = await import("pdf-lib");
  const doc = await PDFDocument.create();
  try {
    if (type === "jpeg") validateJpeg(bytes);
    const image = type === "png" ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
    if (!(image.width > 0 && image.height > 0)) throw new Error("Invalid dimensions");
  } catch {
    throw new Error(`${file.name}: this image could not be read. Select a valid JPEG or PNG.`);
  }
  return { bytes, type };
}
