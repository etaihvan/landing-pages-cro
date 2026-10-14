// FAQ answers shared by every page. Each page picks its order in pages.ts; the first one opens by default.
// Answers are HTML (one <p> per paragraph).
export const faqs = {
  "different": {
    q: "How is Spade different from other transaction enrichment providers?",
    a: "<p>Most providers infer the merchant from the string they receive. Spade looks each transaction up in its merchant graph, so every match is a lookup, not a guess. That is why it holds on the long tail, on charges routed through a third party, across every location of a brand, as merchants change, and on every rail.</p>",
  },
  "categorize": {
    q: "Does Spade categorize transactions?",
    a: "<p>Yes. Every match comes back with the merchant's category, such as Food and Drink \u203a Cafes, along with its address, website, and channel. With Data Operations, your teams can also register the granular categories they care about and get back your own category label.</p>",
  },
  "coverage": {
    q: "What do 99.9% coverage and &gt;99% accuracy measure?",
    a: "<p>99.9% is the share of US and Canadian businesses in Spade's merchant graph. &gt;99% is how often a match is correct. Your sample shows both.</p>",
  },
  "pii": {
    q: "What data do you need? Is any of it PII?",
    a: "<p>No PII, by design. Spade needs only the transaction fields: no customer names, account numbers, or card numbers. And Spade is SOC 2 Type 2.</p>",
  },
  "pricing": {
    q: "How does pricing work?",
    a: "<p>Per transaction, sized to your volume. We'll cover it on the first call.</p>",
  },
  "integration": {
    q: "How long does integration take?",
    a: "<p>Unit had its enrichment live in less than two weeks. You can start with a batch of your history before you integrate the real-time API.</p>",
  },
  "only-enrichment": {
    q: "Is Spade only enrichment?",
    a: "<p>Enrichment is where most teams start. With Data Operations, your teams register the merchants, brands, or granular categories they care about and get back your own reward, control decision, or category label, with no merchant list to maintain.</p><p>Predictions tells you which customer is ready for what, from a transaction foundation model Spade trained: run it out of the box, have it tuned to your objective, or take the software, infrastructure, and embeddings to build your own.</p>",
  },
} as const;

export type FaqId = keyof typeof faqs;
