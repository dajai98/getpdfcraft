"use client";
import { useState } from "react";
import UploadZone from "@/components/ui/UploadZone";
import ToolLayout from "@/components/ui/ToolLayout";
import DownloadButton from "@/components/ui/DownloadButton";

const faqs = [
  { q: "Is removing a PDF password on PDFcraft really free?", a: "Yes, completely free. No hidden fees, no premium plan needed." },
  { q: "Are my files safe when I remove a password?", a: "Absolutely. PDFcraft processes files entirely in your browser using WebAssembly. Your PDF and password never leave your device." },
  { q: "Can PDFcraft crack or bypass a PDF password?", a: "No. PDFcraft requires the correct current password to remove protection. It cannot crack or bypass passwords on documents you are not authorized to access." },
  { q: "Is it legal to remove a PDF password?", a: "Yes — if you own the document or have explicit permission from the owner. Only remove protection from PDFs you are authorized to modify." },
  { q: "What if I forgot the PDF password?", a: "If you do not know the current password, PDFcraft cannot help. You would need to contact whoever created the protected PDF." },
  { q: "Does it work on iPhone and Android?", a: "Yes. PDFcraft works on any device with a modern browser including iPhone Safari and Android Chrome." },
];

export default function UnlockPDF() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState("");

  const handleFile = (files) => { setFile(files[0]); setDownloadUrl(null); setError(""); };

  const unlock = async () => {
    if (!file) return setError("Please select a PDF file.");
    if (!password) return setError("Please enter the current password.");

    setProcessing(true);
    setError("");

    try {
      const createModule = (await import("@neslinesli93/qpdf-wasm")).default;
      const qpdf = await createModule({
        locateFile: () => "https://cdn.jsdelivr.net/npm/@neslinesli93/qpdf-wasm@0.3.0/dist/qpdf.wasm",
        noInitialRun: true,
      });

      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      qpdf.FS.writeFile("/input.pdf", uint8Array);

      qpdf.callMain([
        "--password=" + password,
        "/input.pdf",
        "--decrypt",
        "/output.pdf",
      ]);

      const output = qpdf.FS.readFile("/output.pdf");
      qpdf.FS.unlink("/input.pdf");
      qpdf.FS.unlink("/output.pdf");

      const blob = new Blob([output], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (e) {
      console.error(e);
      setError("Incorrect password or invalid PDF. Please check the password and try again.");
    }
    setProcessing(false);
  };

  return (
    <ToolLayout
      tag="Unlock PDF" tagBg="#F0FDF4" tagColor="#16A34A"
      title="Unlock PDF — Remove Password"
      desc="Remove password protection from a PDF you own. You must know the current password. PDFcraft cannot crack or guess passwords."
      current="/tools/unlock-pdf"
      faqs={faqs}
    >
      {/* Important notice */}
      <div style={{ background: "#FEF2F2", border: "1px solid #fecaca", borderRadius: 12, padding: "16px", marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: "#DC2626", margin: 0, fontWeight: 700 }}>⚠️ You must know the current password</p>
        <p style={{ fontSize: 13, color: "#6b7280", margin: "6px 0 0 0", lineHeight: 1.6 }}>This tool removes password protection from PDFs <strong>you already have the password for</strong>. PDFcraft cannot crack, guess, or bypass unknown passwords. If you forgot the password, we cannot help — this tool is not a password cracker.</p>
      </div>

      {/* Privacy notice */}
      <div style={{ background: "#F0FDF4", border: "1px solid #bbf7d0", borderRadius: 12, padding: "12px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 18 }}>🔒</span>
        <p style={{ fontSize: 13, color: "#15803D", margin: 0, fontWeight: 500 }}>Your file and password never leave your device. 100% private.</p>
      </div>

      <UploadZone onFiles={handleFile} multiple={false} label="Drop your password-protected PDF here or click to browse" />

      {file && (
        <div style={{ marginTop: 20, border: "1px solid #f3f4f6", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: 12, background: "#f9fafb" }}>
            <span style={{ fontSize: 22 }}>🔒</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#374151", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{file.name}</p>
              <p style={{ fontSize: 12, color: "#9ca3af" }}>{(file.size / 1024).toFixed(0)} KB</p>
            </div>
            <button onClick={() => { setFile(null); setDownloadUrl(null); setError(""); }} style={{ color: "#d1d5db", background: "none", border: "none", cursor: "pointer", fontSize: 16, padding: "4px 8px" }}>✕</button>
          </div>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Current Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter the current PDF password"
          style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
        />
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>Enter the password that is currently protecting this PDF.</p>
      </div>

      {error && (
        <div style={{ marginTop: 12, background: "#FEF2F2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 16px" }}>
          <p style={{ fontSize: 13, color: "#DC2626", margin: 0 }}>⚠️ {error}</p>
        </div>
      )}

      {file && password && !downloadUrl && (
        <button
          onClick={unlock}
          disabled={processing}
          style={{ marginTop: 20, width: "100%", background: processing ? "#d1d5db" : "#16A34A", color: "white", border: "none", padding: 16, borderRadius: 14, fontWeight: 700, fontSize: 16, cursor: processing ? "not-allowed" : "pointer", fontFamily: "inherit" }}
        >
          {processing ? "⏳ Removing password..." : "🔓 Unlock PDF"}
        </button>
      )}

      {downloadUrl && (
        <div style={{ marginTop: 24, background: "#F0FDF4", border: "1px solid #bbf7d0", borderRadius: 16, padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <span style={{ fontSize: 40 }}>✅</span>
            <div>
              <p style={{ fontWeight: 700, color: "#111827", fontSize: 17 }}>unlocked.pdf is ready!</p>
              <p style={{ fontSize: 13, color: "#6b7280" }}>Password protection has been removed successfully.</p>
            </div>
          </div>
          <DownloadButton url={downloadUrl} filename="unlocked.pdf" label="Download unlocked.pdf" />
        </div>
      )}
    </ToolLayout>
  );
}