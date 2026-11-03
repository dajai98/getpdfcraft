// Conservative allocation guards, not a guarantee of available device memory.
export const MAX_RENDER_PIXELS = 16_000_000;
export const MAX_ENCODED_BYTES = 128 * 1024 * 1024;
export function checkRasterSize(viewport) {
  const width = Math.ceil(viewport.width), height = Math.ceil(viewport.height);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width < 1 || height < 1 || width * height > MAX_RENDER_PIXELS || width > 16384 || height > 16384) {
    const error = new Error("A page exceeds the rendering limit of 16 million pixels or 16,384 pixels per side. Use a smaller page or a desktop PDF application.");
    error.name = "RasterLimitError";
    throw error;
  }
}
export function checkEncodedSize(bytes) {
  if (bytes > MAX_ENCODED_BYTES) {
    const error = new Error("The rendered images exceed the 128 MiB output limit. Split the PDF into smaller groups and try again.");
    error.name = "RasterLimitError";
    throw error;
  }
}
