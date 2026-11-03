# Agent B — blog usability and navigation

Date: 2026-11-03. Actual delegated read-only review of product sources; root implements changes. This report is a design recommendation and verification checklist, not a claim of browser-tested results.

## Inspected scope

- `app/blog/page.js`: all 31 catalog articles, six catalog-based groups and three technical links.
- `components/ui/BlogPost.js`: article body links, back link, CTA, comparison tables and metadata.
- `components/ui/ToolDocumentation.js`, `ToolLayout.js`, `Navbar.js`, `app/globals.css`.
- `lib/siteNavigation.json` and content-integrity/navigation regression expectations.

## Confirmed presentation gaps

1. The global `a { text-decoration: none; color: inherit; }` reset leaves the six category links and technical-guide paragraph looking like ordinary text. The category list has no component styling.
2. Article listing links are semantic anchors already, but titles inherit ordinary charcoal heading styling. The card hover effect is implemented with pointer-only JavaScript on a child div. Keyboard focus has a global outline but does not receive equivalent card emphasis.
3. BlogPost's list links explicitly suppress underlines except on mouse hover. Underlining on hover alone gives touch users no persistent non-color link cue. The Back to Blog link also suppresses its underline.
4. Six section targets exist, but no scroll offset compensates for the sticky navbar. The collapsed navbar is at least 64px tall, and mobile padding can increase this.
5. ToolDocumentation currently emits no links, so it does not need speculative link-format or markup changes.

## Recommended implementation

Preserve the catalog and all 31 slugs. Replace the category list with a compact two/three-column grid that collapses to one column at narrow widths, or wrapping chips whose entire bordered surface is an anchor. Use local CSS classes and `minmax(0, 1fr)`; retain meaningful accessible labels from the existing catalog.

| Exact destination | Existing meaningful label | Suggested small icon |
| --- | --- | --- |
| `/blog#pages` | Merge and page management | stacked pages |
| `/blog#security` | Security and sharing | lock |
| `/blog#optimization` | Compression and file size | downward arrows |
| `/blog#rendering` | Image rendering and PDF creation | picture |
| `/blog#decisions` | Choose a tool or document workflow | branching arrow |
| `/blog#how-it-works` | How it works and measured results | information circle |

Icons and directional arrows should be decorative (`aria-hidden="true"`), leaving readable labels as accessible names. Use at least 44px card height, restrained warm background, visible border and dark text. Darken the border/background on hover and retain the global focus outline. No dependency or heavy icon library is needed.

Add a visible heading such as **Technical guides**, followed by three compact linked rows. Suggested descriptions make no new results claims:

| Exact destination | Link title | Short accurate description |
| --- | --- | --- |
| `/blog/how-browser-based-pdf-processing-works` | How local processing works | Understand browser processing, downloads and practical limits. |
| `/blog/pdf-compression-real-test-results` | Measure your compression result | Compare original and output sizes and inspect recorded observations. |
| `/blog/pdf-tool-not-working-troubleshooting` | Troubleshoot a failed operation | Use error messages and file checks to choose the next step. |

Make article list anchors the styled cards themselves, with a persistent underline on the title, a subtle border, and shared hover/focus treatment. Remove mouse style handlers. Once handlers are removed, the listing can be a server component by removing `"use client"`; its catalog import and Next Link usage support this.

For BlogPost, add scoped classes for the article and prose links; use persistent underlines with a modest offset. Remove the inline `textDecoration: "none"` and pointer handlers from list links. Use a darker accent such as `#B92B0A` for ordinary text links while retaining `#E8380D` for the brand accent and existing primary controls. Do not apply blanket underlines to button-style CTAs, navbar cards or tool controls. The CTA's secondary processing-limits link should remain visibly a link against its dark background.

Add `scroll-margin-top` around 96px to blog group sections only (or a shared class for the intended homepage/blog section targets). Verify against the real collapsed navbar height at all specified widths. Avoid smooth scrolling; it adds little value and creates reduced-motion obligations.

## Root/browser-agent verification targets

- At 320/360/390/768/1280/1440px, verify all six category links exist once and target the existing section IDs, titles wrap, and the page does not horizontally overflow.
- Click each category at least once at mobile and desktop widths; check the heading's top coordinate is below the sticky navbar. Explicitly test `/blog#how-it-works` from an article CTA, since cross-route fragments also matter.
- Tab to category controls, featured rows and article cards; verify a visible focus indicator and Enter activation. Do not claim this passed from CSS inspection.
- Confirm the three featured rows use the exact requested destinations and have descriptive accessible names without duplicated icon text.
- Test menu expand/collapse and Escape focus return after the longer GetPDFCraft name is introduced, especially at 320px.
- Confirm visible body links remain recognizable on touch, hover and focus, and compare ordinary-text foreground/background contrast.
- Rebuild and run catalog/content/navigation checks to confirm all 31 article URLs and six anchors remain present. No editorial or PDF-processing changes are warranted by this review.

## Boundaries

No product files were modified by Agent B. No article claims, historical measurements, metadata publication dates, slugs, tool logic, privacy or advertising behavior were changed by this review. Browser pass/fail evidence belongs to the rebuilt candidate verification, not this recommendation document.
