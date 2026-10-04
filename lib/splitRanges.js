export function parsePageRanges(value, pageCount) {
  return value.split(",").map(item => {
    const part = item.trim();
    if (!part) throw new Error("Enter a page or range for every comma-separated item; empty items are not allowed.");
    const match = /^(\d+)(?:\s*-\s*(\d+))?$/.exec(part);
    if (!match) throw new Error(`Invalid item "${part}". Use whole page numbers or ranges such as 1-3, 5.`);
    const start = Number(match[1]), end = Number(match[2] || match[1]);
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 1 || end > pageCount || start > pageCount || end < 1)
      throw new Error(`Pages must be between 1 and ${pageCount}: "${part}".`);
    if (start > end) throw new Error(`Range "${part}" is reversed. Put the lower page first.`);
    return { name: start === end ? `page-${start}.pdf` : `pages-${start}-${end}.pdf`, indices: Array.from({ length: end - start + 1 }, (_, i) => start - 1 + i) };
  });
}
