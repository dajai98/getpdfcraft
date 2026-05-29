"use client";
import { useState } from "react";
import UploadZone from "@/components/ui/UploadZone";
import ToolLayout from "@/components/ui/ToolLayout";
import DownloadButton from "@/components/ui/DownloadButton";

const faqs = [
  { q: "Is password protecting a PDF on PDFcraft really free?", a: "Yes, completely free. No hidden fees, no premium plan needed. All tools on PDFcraft are free forever with no limits." },
  { q: "Are my files safe when I add a password?", a: "Absolutely. PDFcraft processes files entirely in your browser using WebAssembly. Your PDF files never leave your device and are never uploaded to any server." },
  { q: "What type of encryption does PDFcraft use?", a: "PDFcraft uses 256-bit AES encryption via QPDF WebAssembly — military-grade security used by banks and governments worldwide." },
  { q: "Can I remove the password later?", a: "Yes. Use PDFcraft's Unlock PDF tool to remove the password. You will need to enter the current password to do so." },
  { q: "What happens if I forget the password?", a: "Unfortunately there is no way to recover a forgotten PDF password. Always store your passwords safely in a password manager before protecting a document." },
  { q: "Does it work on iPhone and Android?", a: "Yes. PDFcraft works on any device with a modern browser including iPhone Safari and Android Chrome." },
];

export default function ProtectPDF() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState("");

  const handleFile = (files) => { setFile(files[0]); setDownloadUrl(null); setError(""); };

  const protect = async () => {
    if (!file) return setError("Please select a PDF file.");
    if (!password) return setError("Please enter a password.");
    if (password.length < 4) return setError("Password must be at least 4 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");

    setProcessing(true);
    setError("");

    try {
      // Use QPDF WebAssembly for real 256-bit AES encryption
      const createModule = (await import("@neslinesli93/qpdf-wasm")).default;
      const qpdf = await createModule({
        locateFile: () => "https://cdn.jsdelivr.net/npm/@neslinesli93/qpdf-wasm@0.3.0/dist/qpdf.wasm",
        noInitialRun: true,
      });

      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Write to QPDF virtual filesystem
      qpdf.FS.writeFile("/input.pdf", uint8Array);

      // Encrypt with 256-bit AES
      qpdf.callMain([
        "/input.pdf",
        "--encrypt",
        password,      // user password
        password,      // owner password
        "256",         // 256-bit AES
        "--print=full",
        "--extract=y",
        "--",
        "/output.pdf",
      ]);

      // Read encrypted output
      const output = qpdf.FS.readFile("/output.pdf");

      // Cleanup
      qpdf.FS.unlink("/input.pdf");
      qpdf.FS.unlink("/output.pdf");

      const blob = new Blob([output], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (e) {
      console.error(e);
      setError("Error protecting PDF. Make sure the file is a valid PDF.");
    }
    setProcessing(false);
  };

  return (
    <ToolLayout
      tag="Protect PDF" tagBg="#FEF2F2" tagColor="#DC2626"
      title="Protect PDF with Password"
      desc="Add 256-bit AES password protection to any PDF. Free, instant, and 100% private. Files never leave your device."
      current="/tools/protect-pdf"
      faqs={faqs}
    >
      {/* Trust notice */}
      <div style={{ background: "#F0FDF4", border: "1px solid #bbf7d0", borderRadius: 12, padding: "12px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 18 }}>🔒</span>
        <p style={{ fontSize: 13, color: "#15803D", margin: 0, fontWeight: 500 }}>256-bit AES encryption. Your file and password never leave your device.</p>
      </div>

      <UploadZone onFiles={handleFile} multiple={false} label="Drop your PDF here or click to browse" />

      {file && (
        <div style={{ marginTop: 20, border: "1px solid #f3f4f6", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: 12, background: "#f9fafb" }}>
            <span style={{ fontSize: 22 }}>📄</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#374151", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{file.name}</p>
              <p style={{ fontSize: 12, color: "#9ca3af" }}>{(file.size / 1024).toFixed(0)} KB</p>
            </div>
            <button onClick={() => { setFile(null); setDownloadUrl(null); setError(""); }} style={{ color: "#d1d5db", background: "none", border: "none", cursor: "pointer", fontSize: 16, padding: "4px 8px" }}>✕</button>
          </div>
        </div>
      )}

      {/* Password inputs */}
      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter a strong password"
            style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
          />
        </div>
        <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>💡 Use at least 8 characters with letters, numbers, and symbols for best security.</p>
      </div>

      {error && (
        <div style={{ marginTop: 12, background: "#FEF2F2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 16px" }}>
          <p style={{ fontSize: 13, color: "#DC2626", margin: 0 }}>⚠️ {error}</p>
        </div>
      )}

      {file && password && !downloadUrl && (
        <button
          onClick={protect}
          disabled={processing}
          style={{ marginTop: 20, width: "100%", background: processing ? "#d1d5db" : "#E8380D", color: "white", border: "none", padding: 16, borderRadius: 14, fontWeight: 700, fontSize: 16, cursor: processing ? "not-allowed" : "pointer", fontFamily: "inherit" }}
        >
          {processing ? "⏳ Encrypting your PDF..." : "🔒 Protect PDF"}
        </button>
      )}

      {downloadUrl && (
        <div style={{ marginTop: 24, background: "#F0FDF4", border: "1px solid #bbf7d0", borderRadius: 16, padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <span style={{ fontSize: 40 }}>✅</span>
            <div>
              <p style={{ fontWeight: 700, color: "#111827", fontSize: 17 }}>protected.pdf is ready!</p>
              <p style={{ fontSize: 13, color: "#6b7280" }}>Your PDF has been encrypted with 256-bit AES password protection.</p>
              <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>⚠️ Store your password safely — it cannot be recovered if lost.</p>
            </div>
          </div>
          <DownloadButton url={downloadUrl} filename="protected.pdf" label="Download protected.pdf" />
        </div>
      )}
    </ToolLayout>
  );
}