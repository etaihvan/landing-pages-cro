# Spade paid-search landing pages

Static pages, no build step. Deploy on Vercel with Framework Preset "Other" and the build command left empty.

## Pages
| URL path | File |
|---|---|
| /lp/demo/transaction-enrichment | lp/demo/transaction-enrichment/index.html |

The path matches the current Unbounce page on explore.spade.com, so Google Ads final URLs don't change after the DNS switch.

## Adding a page
Create `lp/<folder>/<page-name>/index.html`. It's served at `/lp/<folder>/<page-name>`.

## vercel.json
- `/` redirects to www.spade.com.
- Every page is sent with `X-Robots-Tag: noindex`, and each page also has a noindex meta tag, so paid pages stay out of Google search.
- To keep an old Unbounce URL working, add an entry under `redirects`, e.g.
  `{ "source": "/lp/old-page", "destination": "/lp/demo/transaction-enrichment", "permanent": true }`
