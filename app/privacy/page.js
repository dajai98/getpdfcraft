export const metadata = {
  title: "Privacy Policy — PDFcraft",
  description: "How PDFcraft processes documents locally, uses third-party web resources, and stores advertising consent choices.",
  openGraph: { title: "Privacy Policy — PDFcraft", description: "How PDFcraft processes documents locally, uses third-party web resources, and stores advertising consent choices.", url: "https://getpdfcraft.com/privacy", type: "website", images: [{ url: "/og.svg", width: 1200, height: 630, alt: "PDFcraft by Dajai Studio" }] },
  twitter: { card: "summary_large_image", title: "Privacy Policy — PDFcraft", description: "How PDFcraft processes documents locally, uses third-party web resources, and stores advertising consent choices.", images: ["/og.svg"] },
  alternates: { canonical: "https://getpdfcraft.com/privacy" },
};

export default function Privacy() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px" }}>
      <div style={{ marginBottom: 48 }}>
        <span style={{ background: "#FEF2F2", color: "#DC2626", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 1 }}>Privacy Policy</span>
        <h1 style={{ fontSize: 48, fontWeight: 800, color: "#111827", marginTop: 16, marginBottom: 16, letterSpacing: -2, lineHeight: 1.1 }}>
          Your documents.<br />Your browser.
        </h1>
        <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.7 }}>
          Last updated: October 22, 2026. This policy separates local document processing from website, infrastructure, and advertising data.
        </p>
        <p style={{ fontSize: 14, color: "#6b7280", marginTop: 12 }}>
          For privacy questions, <a href="/contact" style={{ color: "#E8380D" }}>contact Rai Dajai at Dajai Studio</a>.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 48 }}>
        {[
          {
            num: "01",
            title: "Local document processing",
            desc: "PDFcraft processes PDF and image contents locally in your browser. The current application does not use a PDF-processing backend to receive document contents. Processing uses browser memory and produces files for you to download. This describes document handling, not every network request made by the website.",
            highlight: true,
          },
          {
            num: "02",
            title: "Website and connection data",
            desc: "No account is required to use the tools. Loading the site and its resources involves requests to hosting and resource providers. Those providers may process connection data such as IP addresses, requested URLs, and browser information. Local document processing does not mean that visiting the website involves no data processing.",
          },
          {
            num: "03",
            title: "Third-party processing resources",
            desc: "Some tools download code or runtime files from jsDelivr: PDF-to-image and grayscale load a PDF.js worker, and Protect and Unlock load a qpdf WebAssembly runtime. These downloads involve requests to the CDN. The application uses those resources to process document contents locally; it does not send the documents to the CDN for processing.",
          },
          {
            num: "04",
            title: "Advertising choices",
            desc: "PDFcraft loads Google AdSense advertising resources only after an accepted choice in the cookie banner. Google and third-party advertising vendors may use cookies or similar identifiers and process advertising or connection data when those resources load. Where personalized advertising is enabled, Google and its partners may serve ads based on prior visits to this site or other sites. You can manage or opt out of personalized Google advertising through Google Ads Settings, linked below. Declining, or leaving the choice unanswered, prevents the consent-dependent advertising script from loading and does not block the core PDF tools. Using the site alone is not treated as acceptance.",
          },
          {
            num: "05",
            title: "Local consent storage",
            desc: "PDFcraft stores the accepted or declined choice in this browser’s localStorage under cookies_accepted, when browser storage is available. If storage is unavailable, the choice applies while the current page remains open. Local storage for this preference is separate from cookies that advertising providers may use. Use Advertising preferences at the bottom of the page to revisit your choice. Withdrawing acceptance reloads the page to stop already-loaded advertising code, clearing selected files and unsaved results; download results first. It does not remove cookies already stored by third parties.",
          },
          {
            num: "06",
            title: "Contacting the creator",
            desc: "If you choose to email support@getpdfcraft.com, your message and email address are shared with the support mailbox and its email infrastructure. Please do not send sensitive documents or passwords in support messages. Contacting support is separate from using the browser tools.",
          },
          {
            num: "07",
            title: "Third-party policies",
            desc: "Hosting, CDN, email, and advertising providers have their own data practices. Local document processing does not guarantee that those providers collect no data. Google’s privacy information is available at the link below.",
          },
          {
            num: "08",
            title: "Policy updates",
            desc: "Changes to this policy will be reflected in the revision date above. A policy update does not itself provide advertising consent. For questions about PDFcraft’s implementation or this policy, use the Contact page.",
          },
        ].map(section => (
          <div key={section.num} style={{
            background: section.highlight ? "#111827" : "#f9fafb",
            border: `1px solid ${section.highlight ? "#111827" : "#f3f4f6"}`,
            borderRadius: 16,
            padding: 32,
            marginBottom: 12,
          }}>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: section.highlight ? "#E8380D" : "#6b7280", letterSpacing: 1, flexShrink: 0, marginTop: 3 }}>{section.num}</span>
              <div>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: section.highlight ? "white" : "#111827", marginBottom: 8 }}>{section.title}</h2>
                <p style={{ fontSize: 15, color: section.highlight ? "#9ca3af" : "#6b7280", lineHeight: 1.7, margin: 0 }}>{section.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p><a href="https://policies.google.com/privacy" style={{ color: "#E8380D" }}>Google Privacy Policy</a> · <a href="https://www.google.com/settings/ads" style={{ color: "#E8380D" }}>Google Ads Settings</a> · <a href="/contact" style={{ color: "#E8380D" }}>Contact PDFcraft</a></p>
    </div>
  );
}
