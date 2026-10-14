# Spade paid-search landing pages

Static pages, no build step. Deploy on Vercel with Framework Preset "Other" and the build command left empty.

## Pages
| URL path | Ad group / keywords it serves | ab_variant sent to HubSpot |
|---|---|---|
| /lp/demo/transaction-enrichment | Core: transaction enrichment, transaction data enrichment, enrich transaction data, enriched transactions, tools / software / solution, ACH and debit card. Also Merchant Data for now. | te-v8-core |
| /lp/demo/transaction-enrichment-providers | Providers: transaction enrichment providers, vendors, build vs buy, pricing | te-v8-providers |
| /lp/demo/transaction-enrichment-api | API: transaction enrichment api, best transaction enrichment api | te-v8-api |
| /lp/demo/transaction-categorization | Categorization: transaction categorization, transaction categorization api, bank transaction categorization | te-v8-categorization |

Each page lives at `lp/demo/<path>/index.html`. All four share the same form, HubSpot setup and tracking.

The path matches the current Unbounce page on explore.spade.com, so Google Ads final URLs don't change after the DNS switch.

## Adding a page
Create `lp/<folder>/<page-name>/index.html`. It's served at `/lp/<folder>/<page-name>`.

## vercel.json
- `/` redirects to www.spade.com.
- Every page is sent with `X-Robots-Tag: noindex`, and each page also has a noindex meta tag, so paid pages stay out of Google search.
- To keep an old Unbounce URL working, add an entry under `redirects`, e.g.
  `{ "source": "/lp/old-page", "destination": "/lp/demo/transaction-enrichment", "permanent": true }`
