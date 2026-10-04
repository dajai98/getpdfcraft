const tools = {
  "merge-pdf": [
    "Merge PDF Files",
    "Combine pages from multiple PDFs in selection order. Files are processed locally in your browser. No account required."
  ],
  "split-pdf": [
    "Split PDF Pages",
    "Extract individual pages or page ranges into separate PDFs. Each comma-separated item creates its own file, processed locally in your browser."
  ],
  "compress-pdf": [
    "Compress PDF Online Free — Reduce File Size",
    "Try structural PDF optimization using object streams. Compare input and output sizes. Embedded images are not explicitly recompressed or downsampled."
  ],
  "pdf-to-image": [
    "PDF to JPG or PNG",
    "Render every PDF page as a JPG or PNG image at a fixed 2x scale. Convert locally in your browser and download individual page images."
  ],
  "jpg-to-pdf": [
    "JPEG and PNG to PDF",
    "Combine JPEG/JPG and PNG images into a PDF, one image per page. Files are validated and processed locally in your browser."
  ],
  "rotate-pdf": [
    "Rotate PDF Pages",
    "Rotate every page in a PDF by 90, 180 or 270 degrees. Process the file locally in your browser and download the result."
  ],
  "watermark-pdf": [
    "Add a Text Watermark to PDF",
    "Add a diagonal text watermark to every PDF page. Set the text and opacity; placement, angle and size are automatic."
  ],
  "delete-pages": [
    "Delete PDF Pages",
    "Remove selected pages from the visible PDF document. This local browser tool is not secure redaction or content sanitization."
  ],
  "add-page-numbers": [
    "Add Page Numbers to PDF",
    "Add sequential page numbers with a starting number, six placement options and three font sizes. Process your PDF locally in your browser."
  ],
  "reorder-pages": [
    "Reorder PDF Pages",
    "Arrange PDF pages using Move Up and Move Down controls, then download a PDF with the new page order. Processing happens locally."
  ],
  "protect-pdf": [
    "Password Protect PDF",
    "Protect a PDF with a password using AES-256 encryption in your browser. Store your password securely; no account is required."
  ],
  "unlock-pdf": [
    "Unlock PDF with a Password",
    "Remove password encryption from a PDF using its current password. Local browser processing; this tool does not crack unknown passwords."
  ],
  "pdf-to-grayscale": [
    "Convert PDF to Grayscale",
    "Create a grayscale PDF with rasterized page images at the displayed physical page size. Searchable text and interactive PDF features are not preserved."
  ]
};

export function toolMetadata(slug) {
  const [name, description] = tools[slug];
  const title = name + " | PDFcraft";
  const ogTitle = slug === "compress-pdf" ? "Compress PDF Online Free | PDFcraft" : title;
  const url = "https://getpdfcraft.com/tools/" + slug;
  return { title, description, alternates: { canonical: url }, openGraph: { title: ogTitle, description, url, type: "website" }, twitter: { card: "summary_large_image", title: ogTitle, description } };
}
