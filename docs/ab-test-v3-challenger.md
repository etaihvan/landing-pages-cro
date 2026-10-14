# A/B challenger: transaction enrichment page (v3)

**Control:** `/lp/demo/transaction-enrichment-v2` (ab_variant `te-v9-sandbox`)
**Challenger:** `/lp/demo/transaction-enrichment-v3` (ab_variant `te-v9-challenger`)

This is a test of one coherent page concept against the control. It cannot isolate the effect of any single change.

---

## What the data says before anything else

- **Traffic is very low.** The whole Enrichment API and Merchant Data campaign drew 114 clicks in two months (Aug 15 to Oct 13, 2026): about 57 a month. The keywords mapped to the core page drew about 22 of them.
- **There is no conversion baseline.** Every keyword sent people to spade.com's homepage, and Google Ads recorded 0 conversions on $3,140. That's either a real 0% or conversion tracking that isn't firing. It has to be checked before the test starts (see Launch requirements).
- **The searchers are shopping for a vendor.** "Transaction enrichment providers" and "vendors" made up 1,443 of 2,162 impressions and 79 of 114 clicks (69%). People typing "transaction enrichment" already know the category. They're comparing who does it well, not learning what it is.
- **Landing page experience was "Below average" on 10 of the 11 keywords that had a score.** That was measured on the homepage, not on these pages.
- **Gap:** I don't have the ad copy, so I can't check the ads' promises against the headline. The hero repeats "transaction enrichment" so it matches any ad built on that keyword.

---

## A. Strategic direction

**The control sells a capability:** "Transaction enrichment that knows SQ *PHILZ MOBILE is Philz Coffee." It's clever and specific, but it shows an easy case (a Square coffee order) that most providers also get right. Then it asks for the visitor's volume before saying what the demo is.

**The challenger sells proof on the buyer's own data.** Someone comparing providers already believes enrichment is useful. What they can't tell is which provider is right on *their* transactions. Spade's own positioning says the difference only shows on hard cases: the long tail, charges behind a third party, and merchants that change. So the challenger:

1. Leads with the hard cases where a lookup beats a guess, instead of an easy example.
2. Shows four raw strings and what Spade returns for each, above the fold.
3. Makes the offer concrete: a 30-minute demo on the transactions you care about, with no PII, and says what happens after you book.
4. Removes every exit except the demo request.

### Messaging directions considered

| Direction | Buyer motivation | Headline tested | Why it could win | Why it wasn't picked |
|---|---|---|---|---|
| A. Outcome-led | Product lead's launch metric | "Fewer disputes. Rewards that land. Controls that hold." | Speaks to business value | Too abstract for someone comparing vendors, and every vendor can say it. Spade's own messaging warns against claims a string cleaner could also make. |
| B. Problem-led | Pain of wrong data | "A wrong merchant costs more than a missing one." | Strong emotional hook | The control already uses it as a section. It names the problem but not why Spade is the answer. |
| C. Developer / build-vs-buy | Engineering cost of building matching | "Stop maintaining a merchant list." | Strong for in-house builders | "Build vs buy" keywords got 0 impressions, and API keywords got 4 of 114 clicks. Wrong audience for this traffic. |
| **D. Proof on hard cases (picked)** | **Picking the right vendor without a bad bet** | **"Transaction enrichment that gets the hard transactions right."** | **Matches comparison intent (69% of clicks). Shows the difference instead of asserting it. Turns the demo into an evaluation the buyer wants anyway.** | Leans on the demo working on a sample (see claims to verify). |

---

## B. Major updates

| Element | Control (v2) | Challenger (v3) | Reason | Expected impact | Evidence or hypothesis |
|---|---|---|---|---|---|
| Headline | "Transaction enrichment that knows SQ *PHILZ MOBILE is Philz Coffee." | "Transaction enrichment that gets the hard transactions right." | Most providers get the control's example right. The hard cases are where Spade differs. | Clearer reason to pick Spade during a vendor comparison | Positioning canvas: lead with the long tail and rails "where the verified record wins". Keyword data: 69% of clicks are provider or vendor comparison. |
| Above-the-fold proof | 3 stats (>99%, <40ms, every rail) | 4 raw strings next to what Spade returns (long tail, third party, marketplace, mobile order), plus a short fact line | Showing beats asserting. Plaid's Enrich page has no before/after, so this sets Spade apart. | More visitors understand the product in the first screen | Hypothesis. Optimizely's B2B notes report a 47% lift from showing visitors what they'd get. |
| Accuracy claim | ">99% accurate" | ">99% card match accuracy" | Spade's messaging doc says the published figures are card figures | Lower risk with technical evaluators | Spade Platform Messaging v7 |
| Navigation | Logo link to spade.com plus 4 anchor links | Logo (not a link) and one "Get a demo" button. Footer keeps only Terms and Privacy. | Each extra link is a way to leave without converting | More demo requests from visitors who stay | HubSpot test: removing navigation lifted conversion 16% and 28% on its two demo pages |
| Differentiation | 5-tab animated merchant graph | 4 static "hard case" cards, each with a raw string and the result | Faster to scan, nothing hidden behind tabs or animation | Better comprehension on mobile | Hypothesis |
| Comparison table | 6 rows | 4 rows: how the merchant is found, long tail, rails, who keeps it current | Keeps the rows that decide a vendor choice | Less reading, same argument | Hypothesis |
| Proof order | Bilt, Unit, Coast | Unit first (bake-off on 1,000 transactions, live in under 2 weeks), then Bilt, Coast, Mercury and G2 | Unit's story is an evaluation, which matches the buyer's job | Reassures evaluators | Hypothesis |
| New section | none | "What happens after you book": pick a time, share a sample (no PII), see results and talk pricing | Takes away the "what am I signing up for" doubt before the ask | Higher form starts from the middle of the page | Hypothesis. NN/g: tell users what they're committing to. |
| FAQ | 7 questions | 5 questions: difference, accuracy, PII, pricing, integration. "Is Spade only enrichment?" removed. | Keep the objections that block booking, cut the upsell | Less distraction | Hypothesis |
| CTA wording | "Get a demo" everywhere | "Get a demo on your own transactions" (hero card, mid-page, sticky). Hero submit "Pick a time →", footer submit "Get a demo on my transactions". | Says what the demo is and what happens next | Higher click-through to the form | Hypothesis |
| Form | Step 1 is a dropdown, then "Next" | Step 1 is one-tap tiles that move straight to step 2, with a "Step 1 of 2" bar | See section C | Higher step-1 completion | Baymard / NN/g: show few options as visible choices, not a dropdown |

---

## C. Form strategy

**Kept:** the two steps in the hero, the single-step footer form, the same HubSpot form (portal 51552623, form 3b40af6b…), RevenueHero router 6767, and the same fields sent to HubSpot.

**Why the volume question stays first and required:**
- It's the main qualifier. Spade's best-fit fintechs run about 100k+ transactions a month, and pricing is per transaction.
- RevenueHero can disqualify a prospect (the page already handles `PROSPECT_DISQUALIFIED`). Routing most likely uses this answer, so removing or moving it could break routing. I couldn't see the router's rules.
- It's the easiest question to answer, and it carries no personal data, so it's a low-risk opener.

**What changed:**

| Change | Control | Challenger | Why |
|---|---|---|---|
| Volume answer | Dropdown plus a "Next" button | One tap on a tile moves to step 2 | Removes a click and a hidden menu. Options are visible. |
| Progress | none | "Step 1 of 2" and "Step 2 of 2" with a bar | Shows the form is short |
| Framing | "How many transactions do you process each month?" | Title "Get a demo on your own transactions", then the volume question | The question reads as part of the offer, not a gate |
| Volume in step 2 | HubSpot's volume dropdown shows again | Hidden in the hero (already answered), still submitted | One fewer visible field |
| Use case | none | Optional one-tap chips: rewards, spend controls, customer feed, categorization, disputes, other | Lets sales tailor the demo without a required field |
| Back link | "← Back" | "← Change volume" | Says what it does |
| Expectation | none | "Next, you pick a time. 30 minutes, no PII needed." | Sets up the scheduler step |

**Trade-off.** The challenger keeps the qualifying question and adds one optional field. I expect a small drop in completion from the extra chips, offset by the one-tap step 1 and clearer framing. The goal is more *qualified* requests, so the volume gate is not loosened.

**How the use-case answer reaches sales.** It goes to dataLayer as `use_case` on `form_use_case` and `lead_submit`. It goes to HubSpot only if the form has a field named `lp_use_case`. Without that field, the page skips it, and HubSpot and sales won't see the answer.

**How to measure the form:** step-1 completion (`form_step_complete`, step `qualify`) over `form_view`, step-2 completion (`lead_submit`) over step-1 completion, the use-case pick rate, and the volume mix of submitted leads compared with the control.

---

## D. Research applied

| Finding | Source | Where it shows up on the page |
|---|---|---|
| Removing navigation lifted conversion 16% and 28% on HubSpot's demo-request pages (0 to 4% on content pages) | [HubSpot: Should you remove navigation from landing pages?](https://blog.hubspot.com/marketing/landing-page-navigation-ht) | Header is the logo and one CTA. The footer keeps only legal links. |
| Demo forms with 4 to 6 required fields had the highest success rate (about 51%) in 50,000+ sessions. 1 to 3 fields did worse, possibly because they looked like newsletter sign-ups. The study did not measure lead quality. | [Factors.ai: the right number of demo form fields](https://www.factors.ai/labs/whats-the-right-number-of-demo-form-fields) | Kept 4 required inputs (volume, first name, last name, email), with no extra required field |
| Multi-step forms can lift completion a lot, and the gains came from analysing where people got stuck and iterating | [Venture Harbour CRO case studies](https://ventureharbour.com/cro-case-studies/) | Kept two steps, added progress, and tracked every step and field so drop-off is visible |
| Showing what the visitor will get lifted registrations 47%. Cutting a form from 9 to 3 fields raised leads but may lower quality. | [Optimizely: form design and lead conversion in B2B](https://www.optimizely.com/de/field-notes/articles/experimentation-use-cases-software-b2b-landing-page) | Before/after table above the fold, and the qualifier was kept |
| Single column, labels close to fields, few optional fields marked clearly as optional, a clear primary action | [NN/g: Website forms usability](https://www.nngroup.com/articles/web-form-design/) | One optional field labelled "(optional)". One primary action per step. |
| Plaid's Enrich page leads with "Turn messy transaction data into user insights", shows no raw-to-enriched example, and puts proof further down | [Plaid Enrich](https://plaid.com/products/enrich/) | A concrete before/after above the fold sets Spade apart from the best-known alternative |
| SaaS pages are the hardest to read of all industries analysed, and software converts below the overall median | [Unbounce Conversion Benchmark Report](https://unbounce.com/conversion-benchmark-report-2020/) | Shorter sentences, plain words, fewer sections |
| Spade's own guidance: lead with the long tail and rails, a lookup not a guess, published numbers only, card figures are card figures | Spade Platform Messaging v7 and Positioning Canvas (project files) | Headline, "hard cases" section, ">99% card match accuracy" |

---

## E. A/B testing hypothesis

By changing the headline to the hard transactions other providers get wrong, adding a before/after of raw strings above the fold, framing the demo as a test on the visitor's own transactions, removing navigation, and making the volume question a one-tap step, we expect fintech and bank teams searching for transaction enrichment providers to be more likely to request a demo with a qualifying volume, because the page shows Spade's difference on the cases that decide a vendor choice and makes clear what the demo gives them. We will measure success using qualified demo requests per visitor, while monitoring the share of leads at 100k+ transactions a month, SQL rate, meetings booked, and cost per qualified request.

---

## F. Technical implementation

**New route:** `/lp/demo/transaction-enrichment-v3`

**Files created (nothing existing was modified):**
- `src/pages/lp/demo/transaction-enrichment-v3.astro`: the page
- `src/v3/LandingLayout.astro`: copy of the v2 shell, plus v3 styles
- `src/v3/components/Header.astro`, `Footer.astro`, `Logos.astro`, `Proof.astro`
- `src/v3/styles/lp.css` and `fonts.css` (forked) and `v3.css` (new)
- `src/v3/scripts/lp.js` (forked form and tracking script) and `logo-fallback.js`
- `docs/ab-test-v3-challenger.md` (this report)

**Form integration:** same HubSpot form and RevenueHero router as the control. Both forms were tested with a HubSpot stand-in, with no real submissions. Each sent first name, last name, email, volume, utm_source, utm_campaign, gclid (TEST123) and ab_variant `te-v9-challenger`. The scheduler hook attached to the same form ID. An empty step 2 was blocked, and "Change volume" went back to step 1 with the earlier answer still selected.

**Tracking:**
- Same GTM container, HubSpot tracking code and event names as the control.
- `lead_submit` still fires only when HubSpot confirms the submission, not on clicks or form starts.
- **New:** a `form_use_case` event and a `use_case` key on every event, which is empty unless a chip is picked.
- **Removed:** `graph_tab`, because the tabbed graph isn't on this page.
- New `data-cta` values: `why` and `mobile-sticky`.
- No names or emails reach dataLayer (checked).

**Build and test results:**
- `npm run build`: 6 pages built, no errors or warnings.
- The repo has no lint or unit-test scripts.
- All five existing pages (control v2 and the four ad-group pages) are byte-for-byte identical to the build before this change.
- The v3 CSS doesn't appear in any other page.
- Desktop (1440), tablet (820) and phone (390): no sideways scroll and no script errors.
- The phone sticky CTA appears after the hero and scrolls to the form below the header.
- The control's form still submits correctly with the same stand-in.

**Not verified (needs access):**
- Real HubSpot submissions and spam filtering on the Netlify domain.
- RevenueHero routing and disqualification rules.
- GTM triggers and Google Ads conversion firing.
- Spade's real fonts, which don't load in this environment.

### Launch requirements
1. **Confirm Google Ads conversion tracking.** The campaign shows 0 conversions. Check in GTM preview that `lead_submit` (or HubSpot's form event) fires the Google Ads conversion tag on both pages, once per submission.
2. **Set up the split in Google Ads, not on the page.** Use a Custom Experiment with a 50/50 cookie-based split, changing only the final URL (v2 against v3). This avoids a redirect, keeps Quality Score data per arm, and reports conversions per arm natively.
3. **Add the Netlify domain to HubSpot's tracked site domains,** or submissions go to Spam.
4. **Optional:** create an `lp_use_case` single-line text property in HubSpot and add it as a hidden field, so the use-case answer reaches sales.
5. **Verify with Spade:**
   - The demo can include a sample of the prospect's own transactions. The control's booking message and FAQ already say so; this page leans on it harder.
   - "Unit was live in under two weeks".
   - The Costco, Instacart and Crunchyroll examples (taken from the control's graph).
6. **Turn on offline conversion import** (gclid → HubSpot lifecycle stage) so SQLs and opportunities can be compared per arm.

---

## G. Experiment design and next steps

**Metrics:**

| Type | Metric | Tells you about |
|---|---|---|
| Primary | Qualified demo requests per visitor: a submission at 100k+ a month that Spade accepts as an MQL | Commercial value |
| Secondary | Demo request rate, form completion rate, cost per qualified request, meetings booked, SQL and opportunity rate (via offline import) | Value and efficiency |
| Diagnostic | CTA click-through, `form_view` to `form_step_complete` to `lead_submit`, drop-off by step, mobile vs desktop, keyword theme | Visitor behaviour only |

**Sample size, honestly:** at about 57 clicks a month across the whole campaign, a classic significance test isn't realistic.

| Baseline request rate | Lift to detect | Visitors per arm (95% confidence, 80% power) | Months at 57 clicks/month |
|---|---|---|---|
| 3% | +50% | ~2,500 | ~88 |
| 3% | +100% | ~750 | ~26 |
| 5% | +100% | ~435 | ~15 |
| 20% (step-1 completion) | +30% | ~770 | ~27 |

**What I recommend instead:**
1. **Run the split for a fixed 8 to 12 weeks,** written down before launch. Send every Enrichment API and Merchant Data keyword to it, not only the core ones.
2. **Read it as directional.** Report the probability that v3 beats v2 (Bayesian) on step-1 completion and demo requests. Don't call a "winner" from p-values.
3. **Put lead quality first.** Review every lead from both arms by hand with Spade's sales team: volume band, use case, whether the meeting happened, whether it became an SQL. With this little traffic, five good meetings matter more than the rate.
4. **Get more traffic to shorten the test:** a higher budget on "transaction enrichment providers", which has the most impressions, and fixing the "low quality" and "rarely served" keywords.

**How to read the results:**
- **v3 ahead on requests and lead quality holds:** make v3 the base, then test the headline alone (hard cases against the Philz example).
- **v3 ahead on requests but lead quality drops:** keep the page and test tightening the volume tiles or making the use case required.
- **No difference:** the bottleneck is likely the ad side (expected CTR and ad relevance were "Below average"). Move effort to ad groups and ad copy before more page tests.
- **v3 behind:** check whether step-1 or step-2 completion fell, using the step events, before blaming the messaging.

**What I'd test next:**
- The headline on its own.
- An interactive "paste a transaction string" demo, if Spade can expose a safe public lookup.
- A providers-specific challenger, since that ad group has most of the traffic.
