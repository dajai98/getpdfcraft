// Replace G-XXXXXXXXXX with your real Google Analytics 4 Measurement ID
// Get it from: analytics.google.com → Admin → Data Streams → Web
const GA_ID = "G-XXXXXXXXXX";

export default function Analytics() {
  if (!GA_ID || GA_ID === "G-XXXXXXXXXX") return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
