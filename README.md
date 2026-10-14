# Spade paid-search landing pages (Astro + Netlify)

The four Google Ads landing pages, built with Astro from one shared layout. The output is plain static HTML, pixel-identical to the hand-built Vercel pages (te-v8).

## Pages
| URL path | Ad group / keywords | ab_variant sent to HubSpot |
|---|---|---|
| /lp/demo/transaction-enrichment | Core: transaction enrichment, transaction data enrichment, enrich transaction data, enriched transactions, tools / software / solution, ACH, debit. Also Merchant Data for now. | te-v8-core |
| /lp/demo/transaction-enrichment-providers | Providers, vendors, build vs buy, pricing | te-v8-providers |
| /lp/demo/transaction-enrichment-api | transaction enrichment api, best transaction enrichment api | te-v8-api |
| /lp/demo/transaction-categorization | transaction categorization (+ api), bank transaction categorization | te-v8-categorization |

The paths match the Unbounce page on explore.spade.com, so Google Ads final URLs survive the DNS switch. Pages build to `lp/demo/<slug>.html`, which Netlify serves at `/lp/demo/<slug>` with no trailing-slash redirect.

## Where to edit
- **Per-page copy** (title, meta description, hero eyebrow / H1 / lede / stats, nav label, FAQ order, section order, ab_variant): `src/data/pages.ts`. Add a page by adding an entry there.
- **FAQ answers:** `src/data/faqs.ts`.
- **Shared sections:** `src/components/*.astro`.
- **Styles:** `src/styles/lp.css` (inlined into each page at build time).
- **Form, HubSpot, RevenueHero and dataLayer tracking:** `src/scripts/lp.js`, inlined at the end of each page. It reads ab_variant from `<body data-ab-variant>`.
- **GTM, HubSpot tracking code, fonts, noindex meta:** `src/layouts/LandingLayout.astro`.

## Run locally
```
npm install
npm run dev      # http://localhost:4321/lp/demo/transaction-enrichment
npm run build    # writes dist/
```

## Deploy on Netlify
1. Add new site → Import an existing project → GitHub → pick the repo and branch.
2. Netlify reads `netlify.toml`: build command `npm run build`, publish directory `dist`, Node 22.
3. Before testing forms, add the site's `*.netlify.app` domain to HubSpot's tracked site domains, or HubSpot sends submissions to Spam as "Unregistered Site Domain".
4. For a spade.com subdomain, the site has to live in **Spade's** Netlify team, because spade.com's DNS is managed there.

## netlify.toml
- `/` redirects to www.spade.com.
- Every response gets `X-Robots-Tag: noindex, nofollow`; each page also has a noindex meta tag.
- To keep an old Unbounce URL working, add a `[[redirects]]` block (there's a commented example).
