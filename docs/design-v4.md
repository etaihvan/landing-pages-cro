# Transaction enrichment v4: design-only redesign

Route: `/lp/demo/transaction-enrichment-v4` · ab_variant `te-v10-design` · page file `src/pages/lp/demo/transaction-enrichment-v4.astro` · styles and motion in `src/v4/`

v4 is v3 with a new visual design. It keeps v3's copy, section order, CTAs, form steps and tracking script. v3, the v2 control and the four ad-group pages build byte-for-byte the same as before.

---

## A. Design research findings

**How the research was done.** A research pass read the current live sites listed below, but only as text. The egress proxy blocked direct fetches, so computed CSS and screenshots of those sites were not available. The findings about them cover structure, content patterns and how each one shows its product. Exact pixel values are not covered. The principles come from the design-system and research sources, which were read in full.

| Principle | Why it works | Seen in | How it shaped v4 |
|---|---|---|---|
| Show the product's actual input and output instead of a decorative screenshot | Technical buyers trust what they can check, and a before/after shows the value at a glance | Modern Treasury (request/response blocks), Column (wire record), Increase (ops log rows), Stripe (code tabs). Plaid's Enrich page shows no example at all | The v3 before/after table became the **ledger**: a full-width dark surface where each raw string runs along a "wire" into the verified merchant record. It uses only the examples v3 already shows. There is no invented JSON or field names, because Spade's real response schema wasn't available to check |
| Ops-style details (status pills, key/value rows, tabular numbers) make a page read as infrastructure | They say "real system" without a fake screenshot | Increase, Column, Resend | Mono row labels in the ledger and compare table, `via` pills, tabular figures for every metric |
| A stat band of a few large numbers with small captions | Instant proof that scans quickly | Stripe, Increase, Column, Modern Treasury, Mercury | The three proof stats became a hairline-divided band with display numerals at about 104px, not three boxed cards |
| Numbered steps explain a process | Order is clear at a glance | Modern Treasury (01–04), Linear ("Fig 0.1") | The four hard cases keep their 01–04 numbers as a ruled ledger. The three booking steps sit on a connected track |
| A restrained logo wall right under the hero | Puts trust next to the claim | Stripe, Ramp, Linear | Logos sit in a hairline grid of equal cells at matched optical height, with the caption as a left-hand label |
| One primary CTA style, repeated | No guessing which button matters | Stripe, Plaid, Ramp, Mercury | Every CTA uses one Forest/Lemongrass button with the same arrow and hover |
| Visible labels above fields; placeholders are hints only | Placeholder-only labels hurt memory, error recovery and contrast | [NN/g](https://www.nngroup.com/articles/form-design-placeholders/), [GOV.UK](https://design-system.service.gov.uk/components/text-input/), [Baymard](https://baymard.com/blog/inline-form-validation) | The hero form's step 2 now shows HubSpot's own field labels, as the footer form already did. Inputs are 48px tall with 16px text, which also stops iOS zoom-on-focus |
| Few sizes, few contrast levels | Hierarchy comes from contrast, not from many styles | [NN/g visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/), [Vercel Geist type](https://vercel.com/geist/typography), [Carbon type](https://carbondesignsystem.com/elements/typography/overview/) | One type scale: display, h2, h3, lede, body, small and an 11px mono label. Text uses three ink levels |
| Colour restraint, with contrast checked per pair | A brand accent loses force when it's everywhere; lime fails as text on white | [Stripe accessible colour systems](https://stripe.com/blog/accessible-color-systems), [Linear UI redesign](https://linear.app/now/how-we-redesigned-the-linear-ui) | Lemongrass only ever sits on Forest. Rust appears only on the ▸ "raw" markers. Every text pair tested is 5.3:1 or better |
| Fluid type with sensible limits; a 45–90 character measure | Sizes scale smoothly and lines stay readable | [web.dev clamp](https://web.dev/articles/min-max-clamp), [Utopia](https://utopia.fyi/blog/designing-with-fluid-type-scales/), [Practical Typography](https://practicaltypography.com/line-length.html) | All sizes use `clamp()`. The lede is capped at 56ch. Headings use `text-wrap: balance` |
| Gestalt proximity | Things that are close read as one group | [NN/g proximity](https://www.nngroup.com/articles/gestalt-proximity/) | Each section's heading and sub sit together in a split header, separated from their content |
| Short, purposeful motion that respects reduced motion | 100–400ms ease-out helps people follow a change; more is a distraction | [NN/g animation duration](https://www.nngroup.com/articles/animation-duration/), [web.dev reduced motion](https://web.dev/articles/prefers-reduced-motion) | One reveal per visual. Steps change in 240ms. Nothing runs under `prefers-reduced-motion` or without JS |
| Fonts and focus | Avoid layout shift; focus must be clearly visible | [web.dev fonts](https://web.dev/articles/font-best-practices), [size-adjust](https://web.dev/articles/css-size-adjust), [WCAG 2.2 focus appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html), [contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | No new fonts. A 2px Forest focus ring sits on a 2px white gap (lime on dark sections). Reveals use only opacity and transform, so they cause no layout shift |

Live sites reviewed as text: stripe.com, stripe.com/payments, linear.app, vercel.com, ramp.com, plaid.com, plaid.com/products/enrich, mercury.com, moderntreasury.com, increase.com, column.com, resend.com. Material 3's motion page needs JavaScript and returned nothing.

## B. Art direction: "the instrument ledger"

v3 looked like the main Spade site: chamfered cards, a sage form and a white page with a table under the hero. The look was sound, but every section used the same weight, and the product example was a plain table.

v4 treats the page as a **precise instrument for financial data**:

- **A visible frame.** On wide screens a 1280px frame has hairline rails down both sides. Each section starts with a hairline that ends in small "+" ticks where it meets the rails, borrowing the corner-tick motif already on spade.com. The result is quiet structure, like a well-ruled ledger.
- **Editorial type.** The display face is larger and tighter (up to 64px, −3.2% tracking, balanced to 3 lines on desktop). Body text is generous. Mono is used only for things that are data: raw strings, row labels, step numbers, form notes.
- **One dark product surface near the top.** The before/after ledger is the one Forest-deep block in the first screen. Raw strings resolve into merchant records as a lime pulse runs along each wire.
- **Colour with a job.** Forest is for action and emphasis (CTAs, the Spade column, the ledger). Lemongrass only appears on Forest. Rust only marks raw input. Sage is the one tonal break, used for the booking-steps band. The case-study colours stay as they are because they are Spade's own.
- **A different layout in each section, from one system.** The hero is a 7/5 split over a full-width visual. Logos are a label plus a cell grid. The why section has a split header, then a 4-column ruled ledger, then a stat band. Compare is a table with a raised Spade column. Proof is a bento with Unit as the lead. Next steps are a connected track. The FAQ has a sticky heading on the left and a list on the right. The final CTA is a dark block with a faint grid.

## C. Major design changes

| Element | v3 | v4 | Why | Expected benefit |
|---|---|---|---|---|
| Hero composition | Copy and before/after stacked on the left; sticky form on the right | Copy 7 columns, form 5 columns, then the ledger across all 12 columns | The product visual needs width to read; the form stays above the fold | Value and proof are absorbed together, and the form is never crowded |
| Headline | 58px max, fixed column | Fluid 38→64px, −3.2% tracking, balanced; 3 lines on desktop and laptop | Deliberate line breaks, no orphan words | A calmer, more confident first read |
| Proof facts | Inline row of three | Hairline-divided figures in the display face with captions (2+1 layout on phones) | Scans like a spec sheet | Faster read of the three numbers |
| Before/after | Light table, plain arrow | Dark "ledger": mono raw strings, a wire with a diamond terminal, the merchant record with avatar, `via` pill and detail; a one-time pulse and resolve on scroll | Makes lookup-not-guess visible; uses only existing examples | The clearest single picture of what Spade does |
| Logos | Centred row at 42% opacity | Hairline cell grid, matched heights, 62% opacity, caption as a label | Even, legible, more confident | Logos look endorsed, not decorative |
| Why section | Heading, sub, four cards | Split header (heading left, sub right), four hard cases as a ruled 4-column ledger aligned with subgrid, examples as a quote-bar callout | Variety plus precise alignment | The four cases read as one argument |
| Stats | Three bracketed boxes | Stat band, display numerals at about 104px in Forest, captions above | One strong moment instead of three medium ones | The numbers stick |
| Compare | Table with a green header and sage cells; scrolls sideways on phones | Spade column as a solid Forest column with chamfered ends; on phones each row becomes a card with Spade's answer first | Scannable at every width; no hidden content on phones | An easy "Spade versus the rest" read |
| Proof | Three equal coloured cards, then a row of three | Bento: Unit as a large lead card with a huge lime "<2 wks", Bilt and Coast stacked beside it; Mercury stat and G2 reviews below | Hierarchy: the hardest metric leads | The proof reads as evidence, not a gallery |
| Next steps | Three white chamfered cards on sage | A connected track with numbered chamfered nodes (vertical on phones) | It is a sequence, so show a sequence | Lowers "what am I signing up for" doubt |
| FAQ | Two columns | Sticky heading, larger questions in the display face, round +/× toggle that fills Forest when open | More editorial; clear state | Easier to scan objections |
| Final CTA | Forest block, sage form | Same base, plus a faint masked grid, bigger headline and a floating form card | One consistent dark close that echoes the ledger | A strong last ask |
| Form | Mono 14px inputs, hidden labels in the hero, 44px controls | Visible labels, 48px inputs with 16px text, 52px tiles and button, lime focus halo, rust error state with icon, animated progress bar | Usability and accessibility research | Fewer input errors and better mobile completion (an expectation, not measured) |
| Buttons | Mono, no icon | Same Forest/Lemongrass, 48px, arrow that nudges on hover, mask icon (not read by screen readers) | One consistent action affordance | Clear, consistent CTAs |
| Responsive | Desktop layout compressed | Breakpoints at 1180, 960 and 640 each re-compose sections (cases 4→2→1, logos 6→3×2, compare table→cards, track horizontal→vertical) | Phones get a designed layout, not a squeezed one | Readable on every device |

## D. Design system (tokens at the top of `src/v4/styles/v4.css`)

- **Colour.** Forest `#18280E`, Forest-2 `#22361D`, Forest-deep `#0E1808`, Lemongrass `#B2EB76` (only on dark), Sage 50/100/200/300/500, Moss `#3F7308`, Rust `#C24A22`. Ink 1–4 at 19:1, 12:1 and 6.2:1 contrast, plus one decorative level. Rails and lines.
- **Type.** The existing brand faces (naNSuperX display, FTPolar sans, FTPolarMono). "Inter Display" is added only as a fallback after naNSuperX. Scale: display 38→64, h2 30→46, h3 18→21, numerals 56→104, lede 17→20, body 16, small 15/13, label 11 mono caps at +0.12em. Line heights: 1.02, 1.08 and 1.55.
- **Space and layout.** A 4px base with steps from 4 to 128. Section padding is fluid from 72 to 136. A 1280 frame, fluid 20→48 gutter, 12 columns and a 24px gap.
- **Shape.** Radii of 2px for controls and 6px for avatars. The chamfer (`--chamfer`, 14px) is reserved for the main surfaces: form cards, ledger, case studies and step nodes. Hairlines replace shadows; there is one float shadow, on the final form.
- **Motion.** ease-out `cubic-bezier(.2,.75,.2,1)`. Durations are 140ms for hover, 240ms for step changes and accordions, and 560ms for reveals, with a 90ms stagger.
- **Focus.** 2px Forest on a 2px white gap, or lime on dark sections.
- **Components.** `.btn-primary`, `.vol-opt` tiles, `.uc-chip`, `.progress`, `.ledger` / `.ledger-row` / `.wire`, `.cases` / `.case`, `.stats` / `.stat`, `.cmp`, `.bento` / `.cs`, `.track`, `.qa`.

## E. Quality assurance

- **Routes created:** `/lp/demo/transaction-enrichment-v4`. **Routes modified:** none.
- **Files created:**
  - `src/pages/lp/demo/transaction-enrichment-v4.astro`
  - `src/v4/LandingLayout.astro`
  - `src/v4/components/{Header,Footer,Logos,Proof}.astro`
  - `src/v4/styles/{fonts,v4}.css`
  - `src/v4/scripts/motion.js`
  - `docs/design-v4.md`
- **Files modified:** `README.md` (one row and one paragraph).
- **Isolation.** v4 runs `src/v3/scripts/lp.js` and `logo-fallback.js` unchanged, through imports, so there is no second copy of the form logic. The other six pages build byte-identical to the v3 branch.
- **Build.** `astro build` succeeds and produces 7 pages. The repo has no linter or type-check script, so none was run.
- **Rendered review.** Playwright and Chromium at 1440×900, 1280×720, 820×1180 and 390×844, folds and full pages, with two design passes after review. Horizontal overflow is 0 at every size and there are no JS errors.
- **Interactions tested** with a HubSpot stand-in:
  - A volume tile moves to step 2, and the volume field is hidden there.
  - An empty submit is blocked.
  - Back keeps the selection.
  - Use-case chips work.
  - Submit carries every field plus `gclid` and `ab_variant=te-v10-design`.
  - The RevenueHero scheduler hooks onto the form.
  - The footer form submits.
  - The event order matches v3 exactly, and `lead_submit` fires only after an accepted submit.
  - No PII appears in dataLayer.
  - The mobile sticky CTA appears and lands the form 80px below the header.
  - The keyboard path works: tab to a tile, press Enter, and step 2 opens with the first name focused.
  - v3 still submits as `te-v9-challenger` and the control as `te-v9-sandbox`.
- **Accessibility.**
  - Every text pair measured passes AA, at 5.3:1 or better.
  - The focus ring is visible on every control.
  - All content is visible with reduced motion and with JS off.
  - Headings run in order (h1, then h2, then h3).
  - Labels are visible.
  - Errors use `role="alert"` and the done state uses `role="status"`.
- **Performance.**
  - No new third-party scripts, fonts or images.
  - The added motion script is about 1KB.
  - Reveals use opacity and transform only, so no layout shift.
  - Decorative grids are CSS gradients, not images.
- **Outstanding / not verifiable here:**
  1. **Spade's brand fonts and logo images** are blocked from this sandbox. The review used stand-ins: Inter Display, Inter and DejaVu Sans Mono, and the text wordmarks the page falls back to. The headline wrap and logo sizing need one look on the Deploy Preview.
  2. The live HubSpot field labels now show in the hero's step 2. Their exact wording comes from HubSpot and was not visible here.
  3. Live HubSpot, RevenueHero and GTM behaviour isn't testable from here, the same as v3. The preview domain must be added to HubSpot's tracked domains before test submits.
  4. Lighthouse and Core Web Vitals were not measured.

## F. Content preservation

The rendered text of v3 and v4 was captured with JS off, including the page title, meta description, every text node, and every `alt`, `aria-label` and `placeholder`. The two captures were diffed line by line and are **identical: 190 of 190 lines, in the same order**. The CTA wording, form questions, steps, use-case chips and submit text all come from the same unchanged `lp.js`.

No copy was changed. Presentation notes:
- The "No PII · SOC 2 Type 2" fact keeps its "·". On desktop it sits inline, and on phones it sits on its own row so the dot reads naturally.
- In the hero, the form card is no longer sticky while scrolling. The full-width ledger needed the space, and the mobile sticky CTA and the "why" CTA still reach a form.

## G. Final assessment

**Biggest lifts.**
1. **The ledger.** It shows lookup-not-guess on real strings in the first screen. This change does the most for comprehension.
2. **The type system and the frame.** Balanced display type, hairline structure and restrained colour are what make the page read as serious infrastructure rather than a template.
3. **The form craft.** Visible labels, larger targets, clear focus and error states, and a progress bar that animates. This is most likely to affect completion, especially on phones.

v4 also changes layout and design in many places at once. If it runs as its own arm, a result can't be traced to any single change. The cleanest use is as the next challenger design, once v3 versus v2 has a read.

**Next iterations.**
- Add a metric-matched `size-adjust` fallback for naNSuperX once its metrics can be measured, to remove the font-swap shift.
- Self-host the brand fonts and logos rather than loading them from spade.com and WordPress.
- If Spade shares a sanitized real API response, a request/response panel could sit under the ledger.
- Real merchant logos in the ledger avatars, if licensing allows.
- Test whether a sticky hero form on wide screens helps.
