// Calculate in displayed-page coordinates (bottom-left origin), then map
// back to PDF user space. The visible area is CropBox intersected with MediaBox.
export function visiblePage(page) {
  const media = page.getMediaBox(), crop = page.getCropBox();
  const x = Math.max(media.x, crop.x), y = Math.max(media.y, crop.y);
  const width = Math.min(media.x + media.width, crop.x + crop.width) - x;
  const height = Math.min(media.y + media.height, crop.y + crop.height) - y;
  const rotation = ((page.getRotation().angle % 360) + 360) % 360;
  if (![x, y, width, height].every(Number.isFinite) || width <= 0 || height <= 0 || ![0, 90, 180, 270].includes(rotation)) {
    throw new Error("This PDF has unsupported visible page geometry.");
  }
  return {
    width: rotation % 180 ? height : width,
    height: rotation % 180 ? width : height,
    point: (px, py) => {
      switch (rotation) {
        case 90: return { x: x + width - py, y: y + px };
        case 180: return { x: x + width - px, y: y + height - py };
        case 270: return { x: x + py, y: y + height - px };
        default: return { x: x + px, y: y + py };
      }
    },
    angle: angle => rotation + angle,
  };
}

export function pageNumberPlacement(page, font, text, size, position) {
  const view = visiblePage(page);
  const width = font.widthOfTextAtSize(text, size);
  const ascent = font.heightAtSize(size, { descender: false });
  const descent = font.heightAtSize(size) - ascent;
  const margin = Math.min(20, view.width * 0.1, view.height * 0.1);
  if (width > view.width - 2 * margin || size + descent > view.height - 2 * margin) {
    throw new Error("A page is too small for the selected page number and font size.");
  }
  const [vertical, horizontal] = position.split("-");
  const x = horizontal === "left" ? margin : horizontal === "right" ? view.width - margin - width : (view.width - width) / 2;
  const y = vertical === "top" ? view.height - margin - size : Math.max(margin, descent);
  return { ...view.point(x, y), size, angle: view.angle(0) };
}

export function watermarkPlacement(page, font, text) {
  const view = visiblePage(page);
  let size = Math.min(view.width, view.height) * 0.08;
  const width = font.widthOfTextAtSize(text, size);
  const ascent = font.heightAtSize(size, { descender: false });
  const descent = font.heightAtSize(size) - ascent;
  const diagonal = Math.SQRT1_2;
  const extent = (width + ascent + descent) * diagonal;
  const margin = Math.min(20, view.width * 0.05, view.height * 0.05);
  const fit = Math.min(1, (view.width - 2 * margin) / extent, (view.height - 2 * margin) / extent);
  size *= fit;
  // Center and, only when necessary, fit the entire 45-degree text box.
  const centerX = (width - ascent + descent) * diagonal * fit / 2;
  const centerY = (width + ascent - descent) * diagonal * fit / 2;
  return { ...view.point(view.width / 2 - centerX, view.height / 2 - centerY), size, angle: view.angle(45) };
}
