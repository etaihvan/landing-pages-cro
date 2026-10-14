import type { FaqId } from './faqs';

// One entry per Google Ads landing page. Everything not listed here is shared by every page.
// To add a page: copy an entry, give it a new slug and abVariant, and run `npm run build`.

export interface Stat { value: string; label: string }

export interface LandingPage {
  /** Served at /lp/demo/<slug>. Matches the Unbounce path on explore.spade.com. */
  slug: string;
  /** Ad group this page serves (for reference only, not shown on the page). */
  adGroup: string;
  /** Written to the HubSpot "ab_variant" hidden field on submit. */
  abVariant: string;
  title: string;
  description: string;
  hero: {
    eyebrow: string;
    /** Three H1 lines. Write `SQ *PHILZ MOBILE` and it is set in the mono transaction style. */
    h1: [string, string, string];
    lede: string;
    stats: [Stat, Stat, Stat];
  };
  nav: { compareLabel: string; showApi?: boolean };
  /** Comparison table directly under the logos (providers page) instead of after the merchant graph. */
  compareFirst?: boolean;
  compareEyebrow: string;
  /** Adds the "Integrate Spade's API in minutes" section under the logos. */
  apiSection?: boolean;
  /** FAQ order. The first one opens by default. */
  faq: FaqId[];
}

const stats: [Stat, Stat, Stat] = [
  { value: '>99%', label: 'accurate: every match is a lookup' },
  { value: '<40ms', label: 'p99, inside the authorization window' },
  { value: 'Every rail', label: 'one counterparty ID per business' },
];

export const pages: LandingPage[] = [
  {
    slug: 'transaction-enrichment',
    adGroup: 'Core: transaction enrichment, transaction data enrichment, enrich transaction data, enriched transactions, tools / software / solution, ACH, debit. Also Merchant Data for now.',
    abVariant: 'te-v8-core',
    title: 'Transaction Enrichment | Spade',
    description: 'Spade turns messy transaction data into structured, verified records: the verified merchant, its category, and its location.',
    hero: {
      eyebrow: '[Transaction data enrichment]',
      h1: ['Transaction enrichment', 'that knows SQ *PHILZ MOBILE', 'is Philz Coffee.'],
      lede: 'Spade turns messy transaction data into verified records. It looks every transaction up in its merchant graph, which covers 99.9% of US and Canadian businesses, and returns the merchant, its category, and its location.',
      stats,
    },
    nav: { compareLabel: 'How Spade compares' },
    compareEyebrow: '[How Spade compares]',
    faq: ['different', 'categorize', 'coverage', 'pii', 'pricing', 'integration', 'only-enrichment'],
  },
  {
    slug: 'transaction-enrichment-providers',
    adGroup: 'Providers: transaction enrichment providers, vendors, build vs buy, pricing',
    abVariant: 'te-v8-providers',
    title: 'Transaction Enrichment Providers Compared | Spade',
    description: 'Most transaction enrichment providers infer the merchant from the string. Spade looks every transaction up in its merchant graph.',
    hero: {
      eyebrow: '[Comparing transaction enrichment providers?]',
      h1: ['The transaction enrichment', 'provider that knows', 'SQ *PHILZ MOBILE is Philz Coffee.'],
      lede: 'Most providers infer the merchant from the transaction string. Spade looks every transaction up in its merchant graph, which covers 99.9% of US and Canadian businesses, so every match is a lookup, not a guess.',
      stats,
    },
    nav: { compareLabel: 'Compare providers' },
    compareFirst: true,
    compareEyebrow: '[Transaction enrichment providers, compared]',
    faq: ['different', 'coverage', 'pii', 'pricing', 'integration', 'only-enrichment'],
  },
  {
    slug: 'transaction-enrichment-api',
    adGroup: 'API: transaction enrichment api, best transaction enrichment api',
    abVariant: 'te-v8-api',
    title: 'Transaction Enrichment API | Spade',
    description: "Spade's real-time transaction enrichment API returns the verified merchant, its category, and its location, with p99 latency under 40ms.",
    hero: {
      eyebrow: '[Transaction enrichment API]',
      h1: ['A transaction enrichment API', 'that knows SQ *PHILZ MOBILE', 'is Philz Coffee.'],
      lede: "Send a transaction to Spade's real-time API and get back the verified merchant, its category, and its location, looked up in a merchant graph that covers 99.9% of US and Canadian businesses.",
      stats,
    },
    nav: { compareLabel: 'How Spade compares', showApi: true },
    compareEyebrow: '[How Spade compares]',
    apiSection: true,
    faq: ['integration', 'different', 'coverage', 'pii', 'pricing', 'only-enrichment'],
  },
  {
    slug: 'transaction-categorization',
    adGroup: 'Categorization: transaction categorization, transaction categorization api, bank transaction categorization',
    abVariant: 'te-v8-categorization',
    title: 'Transaction Categorization | Spade',
    description: 'A category is only as good as the merchant behind it. Spade returns the verified merchant and its category for every transaction.',
    hero: {
      eyebrow: '[Transaction categorization]',
      h1: ['Transaction categorization', 'that knows SQ *PHILZ MOBILE', 'is Philz Coffee, a cafe.'],
      lede: 'A category is only as good as the merchant behind it. Spade looks every transaction up in its merchant graph, which covers 99.9% of US and Canadian businesses, and returns the merchant with its category.',
      stats: [stats[0], stats[1], { value: '<1%', label: 'manually recategorized at Mercury' }],
    },
    nav: { compareLabel: 'How Spade compares' },
    compareEyebrow: '[How Spade compares]',
    faq: ['categorize', 'different', 'coverage', 'pii', 'pricing', 'integration', 'only-enrichment'],
  },
];
