// pdf-lib reads JPEG dimensions without validating complete scan data.
// Check marker boundaries, frame/scan headers, entropy presence and EOI.
// This is structural validation, not a full JPEG entropy decoder.
export function validateJpeg(bytes) {
  const fail = () => { throw new Error("Incomplete or malformed JPEG"); };
  const word = i => bytes[i] * 256 + bytes[i + 1];
  if (bytes.length < 4 || word(0) !== 0xffd8) fail();
  let offset = 2, frame = null, scans = 0;
  const scanned = new Set();
  while (offset < bytes.length) {
    if (bytes[offset++] !== 0xff) fail();
    while (bytes[offset] === 0xff) offset++;
    const marker = bytes[offset++];
    if (marker === 0xd9) {
      if (!frame || !scans || frame.some(id => !scanned.has(id))) fail();
      return;
    }
    if (marker === undefined || marker === 0 || marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd7)) fail();
    if (offset + 2 > bytes.length) fail();
    const length = word(offset), end = offset + length;
    if (length < 2 || end > bytes.length) fail();
    const data = offset + 2;
    const isFrame = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
    if (isFrame) {
      if (frame || length < 8) fail();
      const count = bytes[data + 5];
      if (![1, 3, 4].includes(count) || length !== 8 + 3 * count || !word(data + 1) || !word(data + 3)) fail();
      frame = Array.from({ length: count }, (_, i) => bytes[data + 6 + i * 3]);
      if (new Set(frame).size !== count) fail();
    }
    offset = end;
    if (marker === 0xda) {
      const count = bytes[data];
      if (!frame || !count || count > frame.length || length !== 6 + 2 * count) fail();
      const ids = Array.from({ length: count }, (_, i) => bytes[data + 1 + i * 2]);
      if (new Set(ids).size !== count || ids.some(id => !frame.includes(id))) fail();
      ids.forEach(id => scanned.add(id));
      let entropyBytes = 0;
      // Stuffed FF00 and restart markers are allowed within a scan.
      while (offset < bytes.length) {
        if (bytes[offset] !== 0xff) { entropyBytes++; offset++; continue; }
        const start = offset++;
        while (bytes[offset] === 0xff) offset++;
        const next = bytes[offset];
        if (next === 0) { entropyBytes++; offset++; }
        else if (next >= 0xd0 && next <= 0xd7) offset++;
        else { offset = start; break; }
      }
      if (!entropyBytes) fail();
      scans++;
    }
  }
  fail();
}
