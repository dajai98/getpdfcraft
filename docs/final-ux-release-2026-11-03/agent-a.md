# Agent A — homepage and visual direction

Reviewed 3 November 2026. Scope: read-only inspection of `app/page.js`, `app/globals.css`, `lib/siteNavigation.json`, `components/ui/Navbar.js` and `components/ui/Ads.js`. This is implementation guidance from source inspection, not a claim of completed visual/browser verification. Lead owns product edits.

## Findings and implementation decisions

1. The catalog follows an 80px-top-padding hero, duplicated benefit pills, a separate introduction and a six-row comparison table. Move the existing catalog immediately after a compact hero; retain supporting transparency content below it. A 36–48px hero top/bottom padding and 42–58px desktop heading make tool access the main visual priority. At narrow widths use approximately 32px heading, 16px horizontal gutters and 28px vertical padding. Avoid a large empty hero or extra decorative assets.
2. The four existing category links are a plain list. Replace their presentation with semantic `Link` cards inside the existing `nav aria-label="Tool categories"`; one link per card, containing decorative small SVG, heading, short description and decorative arrow. Do not nest buttons or links. Keep every current anchor and all 13 actual tool links.
3. Match restrained warm white surfaces (`#FCFAF8`), white cards, charcoal text (`#202020`), muted text (`#5F5A56`), light warm borders (`#E8E1DC`) and the requested `#E8380D` accent. Avoid the current mix of oversized emoji and many unrelated icon background colors; small 18–22px code-native icons suit compact navigation.
4. Preserve accurate qualifications beside the tools: no existing-text editing, OCR or PDF-to-Word; structural compression may not reduce every file; local document processing is separate from website/runtime network requests. Keep the creator attribution Dajai Studio. Public presentation name is GetPDFCraft.
5. Manual `AdLeaderboard` currently returns null. Do not introduce blank spacing for those placeholders. Current live advertising configuration is outside this visual inspection.

## Exact category mapping

| Presentation title | Practical description | Existing destination | Meaningful icon |
|---|---|---|---|
| Page management | Merge, split and arrange your pages. | `/#tools-pages` | Two page outlines |
| Size and appearance | Compress, add labels or make grayscale copies. | `/#tools-optimization` | Adjustment sliders |
| Password access | Protect a PDF or unlock it with its password. | `/#tools-security` | Padlock |
| Images and PDF | Render PDF pages or create a PDF from images. | `/#tools-rendering` | Image outline |

Keep grouping membership from `siteNavigation.json`; presentation labels can be a local mapping. Existing tool descriptions remain concise and accurate. Five page-management, four appearance, two password and two image tools total 13.

## Concrete CSS shape

- Scope rules to homepage/category classes, not all anchors or cards globally.
- Container: `max-width:1152px; margin-inline:auto; padding-inline:24px` (16px below 600px).
- Category grid: `display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px`; two columns below 1000px, one below 600px. All children `min-width:0`.
- Category link: `display:grid; grid-template-columns:24px minmax(0,1fr) 16px; gap:12px; padding:18px; border:1px solid #E8E1DC; border-radius:14px; background:white`. Title 15–16px/700, description 13–14px/1.5. All of the card is a link, already comfortably above 44px high.
- Hover: darker border and warm background, optionally a restrained shadow. No translate animation needed. Focus: 3px solid accent outline, 3px offset, never clipped by parent overflow.
- Anchor targets: `scroll-margin-top:96px` for sticky closed navbar; mobile menu must close on category navigation before target positioning is verified. Direct-fragment landing must also be tested.
- Tool catalog grid: `repeat(auto-fit,minmax(min(100%,230px),1fr))`, 14–16px gaps; card padding around 20px. This guards the 320px layout without forcing horizontal overflow.

## Contrast constraint

Computed WCAG relative-luminance contrast for `#E8380D` against white is **4.198:1**. It works for non-text boundaries and large bold text, but not normal-sized white CTA text. Preserve the requested brand accent while using a darker fill such as `#C92F0A` for buttons with 14–16px white text, or make CTA text at least 19px bold. Use dark text for ordinary card titles; do not rely on orange alone to communicate clickability.

## Required verification after integration

Actual rebuilt browser checks must cover 320/360/390/768/1280/1440px: all four card destinations, direct fragments, visible heading under sticky navbar, menu close/Escape/focus return, keyboard focus on cards, all 13 tool links and no overflow. Capture homepage desktop/mobile screenshots and review whether users encounter the catalog before supporting explanatory material. These results belong to the verification agent, not this source review.
