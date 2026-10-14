import { defineConfig } from 'astro/config';

export default defineConfig({
  // Pages build to /lp/demo/<slug>.html, which Netlify serves at /lp/demo/<slug> with no redirect,
  // so the Google Ads final URLs stay exactly as they are on explore.spade.com.
  build: { format: 'file', inlineStylesheets: 'always' },
  trailingSlash: 'never',
});
