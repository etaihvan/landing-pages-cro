/* =========================================================
   CONFIG — the only block you normally need to edit
   ========================================================= */
const CONFIG = {
  abVariant: document.body.dataset.abVariant || "",   // written to the HubSpot "ab_variant" field; set per page in src/data/pages.ts
  formLocationField: "lp_form_location",   // optional hidden HubSpot field: "hero" or "footer"
  hubspot: { portalId: "51552623", formId: "3b40af6b-2fa5-4dea-9d17-c677a83ee196", region: "na1" },
  revenueHeroRouterId: "6767",
  submitText: "Pick a time →",
  // Fallback qualifier options, used only if the HubSpot form can't be read.
  // Normally the options are read live from the HubSpot field below.
  volumeField: "numbers_of_monthly_transactions",
  volumeFallback: ["Under 100,000/month","100,000–500,000/month","500,000–1M/month","1M–5M/month","5M+/month"]
};

/* ---------- Analytics (GTM dataLayer) ---------- */
window.dataLayer = window.dataLayer || [];
/* Every event carries the same set of keys. Keys an event doesn't use are reset to undefined,
   so values from an earlier event never leak into a later one in GTM. No names or emails are ever sent. */
const EVENT_KEYS = ["link_text","link_url","link_location","cta","form_location","form_type","step_name","step_number","field_name","error_type","volume","item"];
const FORM_TYPE = {hero: "multi_step", final: "single_step"};
const STEP_NUM = {hero: {qualify: 1, contact: 2, done: 3}, final: {contact: 1, done: 2}};
function track(event, data){
  const d = Object.assign({}, data || {});
  if (d.form){ d.form_location = d.form; delete d.form; }
  if (d.step){ d.step_name = d.step; delete d.step; }
  if (d.form_location){
    d.form_type = FORM_TYPE[d.form_location];
    if (d.step_name && d.step_number == null) d.step_number = (STEP_NUM[d.form_location] || {})[d.step_name];
  }
  const payload = {event};
  EVENT_KEYS.forEach(k => payload[k] = d[k]);
  window.dataLayer.push(payload);
}
const linkText = a => a.classList.contains("cs")
  ? "Case study: " + ((a.querySelector(".cs-logo") || {}).alt || (a.querySelector(".brand") || {}).textContent || "").trim()
  : (a.getAttribute("aria-label") || a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 100);
// Header (global nav): logo, menu items and the nav "Get a demo" button
document.querySelectorAll("#nav a").forEach(a => a.addEventListener("click", () =>
  track("nav_click", {link_text: linkText(a), link_url: a.getAttribute("href"), link_location: "header"})));
// "Get a demo" buttons outside the header
document.querySelectorAll("[data-cta]:not(#nav [data-cta])").forEach(a => a.addEventListener("click", () =>
  track("cta_click", {cta: a.dataset.cta, link_text: linkText(a), link_url: a.getAttribute("href"), link_location: (a.closest("section,footer,.mobile-cta") || {}).id || a.dataset.cta})));
// Every other link (case studies, footer links)
document.querySelectorAll("a:not(#nav a):not([data-cta])").forEach(a => a.addEventListener("click", () =>
  track("link_click", {link_text: linkText(a), link_url: a.href, link_location: (a.closest("section,footer") || {}).id || (a.closest("footer") ? "footer" : "")})));

/* ---------- Tracking params: capture on landing, persist for the session ---------- */
const TRACK_KEYS = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content","gclid","gbraid","wbraid"];
const tracking = (() => {
  const url = new URLSearchParams(location.search);
  let stored = {};
  try { stored = JSON.parse(sessionStorage.getItem("lp_tracking") || "{}"); } catch(e) {}
  TRACK_KEYS.forEach(k => { if (url.get(k)) stored[k] = url.get(k); });
  try { sessionStorage.setItem("lp_tracking", JSON.stringify(stored)); } catch(e) {}
  return stored;
})();

/* ---------- One HubSpot form, shared by both cards ----------
   HubSpot + RevenueHero both key off a single form element (#hsForm_<id>),
   so the form is rendered once and moved into whichever card the visitor uses. */
const host = document.createElement("div");
host.id = "hs-form-host";
host.innerHTML = '<div class="form-loading">Loading form…</div>';
let hsForm = null, activeCard = null, submittedData = {};

function setField(name, value){
  if (!hsForm) return false;
  const el = hsForm.querySelector(`[name="${name}"]`);
  if (!el || value == null) return false;
  const proto = el.tagName === "SELECT" ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value").set.call(el, value);   // lets HubSpot's form state see the change
  el.dispatchEvent(new Event("input", {bubbles:true}));
  el.dispatchEvent(new Event("change", {bubbles:true}));
  return true;
}

function volumeOptions(){
  const sel = hsForm && hsForm.querySelector(`select[name="${CONFIG.volumeField}"]`);
  if (sel) return [...sel.options].filter(o => o.value).map(o => ({value:o.value, label:o.textContent.trim()}));
  return CONFIG.volumeFallback.map(v => ({value:v, label:v}));
}
function renderQualifiers(){
  const opts = volumeOptions();
  document.querySelectorAll("[data-volume-opts]").forEach(box => {
    const card = box.closest(".lead-card").dataset.card;
    const prev = box.querySelector("select") && box.querySelector("select").value;
    box.innerHTML = `<select class="field vol-select" name="vol_${card}" aria-label="Transactions each month"><option value="">Select an option</option>` +
      opts.map(o => `<option value="${o.value}">${o.label}</option>`).join("") + `</select>`;
    if (prev) box.querySelector("select").value = prev;
  });
}
renderQualifiers();

function showStep(card, step, silent){
  card.querySelectorAll(".lstep").forEach(s => s.classList.toggle("active", s.dataset.step === step));
  if (!silent) track("form_step_view", {form: card.dataset.card, step});
}
// form_start: first time a visitor touches a form (once per form per page view)
const started = {};
function markStart(card){
  const f = card.dataset.card;
  if (started[f]) return;
  started[f] = true;
  track("form_start", {form: f, step: card.querySelector(".lstep.active").dataset.step});
}
document.querySelectorAll(".lead-card").forEach(card => ["focusin","change"].forEach(t => card.addEventListener(t, e => { if (e.isTrusted) markStart(card); })));
// form_view: the form is at least half on screen (once per form per page view)
new IntersectionObserver((es, o) => es.forEach(e => {
  if (!e.isIntersecting) return;
  const card = e.target;
  track("form_view", {form: card.dataset.card, step: card.querySelector(".lstep.active").dataset.step});
  o.unobserve(card);
}), {threshold: .5}).observe(document.getElementById("hero-form-card"));

document.querySelectorAll(".lead-card").forEach(card => {
  card.addEventListener("change", e => {
    if (!e.target.matches('.vol-select')) return;
    e.target.classList.remove("invalid");
    card.querySelector("[data-err]").textContent = "";
    track("form_qualify", {form: card.dataset.card, volume: e.target.value});
  });
  if (!card.querySelector("[data-next]")) return;     // footer card is a single-step form
  card.querySelector("[data-next]").addEventListener("click", () => {
    const picked = card.querySelector(".vol-select");
    if (!picked.value){
      picked.classList.add("invalid"); card.querySelector("[data-err]").textContent = "Select your monthly volume to continue.";
      track("form_error", {form: card.dataset.card, step: "qualify", field_name: CONFIG.volumeField, error_type: "required"});
      return;
    }
    track("form_step_complete", {form: card.dataset.card, step: "qualify", volume: picked.value});
    activeCard = card;
    placeForm(card);                                         // move the single form into this card
    setField(CONFIG.volumeField, picked.value);              // carry the answer into HubSpot
    showStep(card, "contact");
    const first = host.querySelector('input:not([type="hidden"])'); if (first) first.focus({preventScroll:true});
  });
  card.querySelector("[data-back]").addEventListener("click", () => {
    track("form_back", {form: card.dataset.card, step: "contact"});
    showStep(card, "qualify");
  });
});
/* The footer shows the full form at all times; the hero borrows it after step 1.
   When the form leaves the hero, the hero resets to step 1 (its answer is kept). */
const heroCard = document.getElementById("hero-form-card"), finalCard = document.getElementById("final-form-card");
const FULL_FORM = {
  labels: { firstname: "First name", lastname: "Last name", email: "Work email", [CONFIG.volumeField]: "Transactions each month" },
  placeholders: { firstname: "First name", lastname: "Last name", email: "Enter your work email", company: "Enter your company" },
  submitText: "Get a demo"
};
function applyFormMode(full){
  if (!hsForm) return;
  Object.entries(FULL_FORM.labels).forEach(([name, text]) => {
    const lab = hsForm.querySelector(`.hs_${name}>label span:not(.hs-form-required)`) || hsForm.querySelector(`.hs_${name}>label`);
    if (!lab) return;
    if (lab.dataset.orig == null) lab.dataset.orig = lab.textContent;
    lab.textContent = full ? text : lab.dataset.orig;
  });
  Object.entries(FULL_FORM.placeholders).forEach(([name, text]) => {
    const el = hsForm.querySelector(`[name="${name}"]`);
    if (!el) return;
    if (el.dataset.orig == null) el.dataset.orig = el.getAttribute("placeholder") || "";
    el.setAttribute("placeholder", full ? text : el.dataset.orig);
  });
  const blank = hsForm.querySelector(`select[name="${CONFIG.volumeField}"] option[value=""]`);
  if (blank){
    if (blank.dataset.orig == null) blank.dataset.orig = blank.textContent;
    blank.textContent = full ? "Select" : blank.dataset.orig;
  }
  const btn = hsForm.querySelector('.hs-button, [type="submit"]');
  if (btn){
    if (btn.dataset.orig == null) btn.dataset.orig = btn.value || btn.textContent;
    const t = full ? FULL_FORM.submitText : btn.dataset.orig;
    if (btn.tagName === "INPUT") btn.value = t; else btn.textContent = t;
  }
}
function placeForm(card){
  if (host.parentElement === card.querySelector(".hs-slot")) return;
  if (card !== heroCard && heroCard.querySelector('.lstep.active[data-step="contact"]')) showStep(heroCard, "qualify", true);
  card.querySelector(".hs-slot").appendChild(host);
  activeCard = card;
  applyFormMode(card === finalCard);
  setField(CONFIG.formLocationField, card === finalCard ? "footer" : "hero");   // which form the lead used
}
placeForm(finalCard);
new IntersectionObserver((es, o) => es.forEach(e => {
  if (!e.isIntersecting) return;
  track("form_view", {form: "final", step: "contact"});
  o.disconnect();
}), {threshold: .5}).observe(finalCard);
// Bring the form back to the footer whenever the footer scrolls into view (unless it was already submitted).
new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting && !finalCard.querySelector('.lstep.active[data-step="done"]') && !heroCard.querySelector('.lstep.active[data-step="done"]')) placeForm(finalCard);
}), {threshold:.15}).observe(finalCard);
// Track volume picks made directly in the footer form.
host.addEventListener("change", e => {
  if (e.isTrusted && activeCard === finalCard && e.target.name === CONFIG.volumeField) track("form_qualify", {form: "final", volume: e.target.value});
});
// Field-level progress inside the HubSpot form: which fields get filled (names only, never values).
const fieldsDone = {};
host.addEventListener("focusout", e => {
  const el = e.target;
  if (!el.name || el.type === "hidden" || !el.value || !activeCard) return;
  const key = activeCard.dataset.card + ":" + el.name;
  if (fieldsDone[key]) return;
  fieldsDone[key] = true;
  track("form_field_complete", {form: activeCard.dataset.card, step: "contact", field_name: el.name});
});
// HubSpot validation errors (e.g. missing or blocked email), one event per field per message.
const errSeen = {};
new MutationObserver(() => {
  if (!activeCard) return;
  host.querySelectorAll(".hs-error-msgs").forEach(list => {
    const field = list.closest(".hs-form-field");
    const input = field && field.querySelector("[name]");
    const msg = list.textContent.trim();
    const key = activeCard.dataset.card + ":" + (input ? input.name : "") + ":" + msg;
    if (!msg || errSeen[key]) return;
    errSeen[key] = true;
    track("form_error", {form: activeCard.dataset.card, step: "contact", field_name: input ? input.name : "", error_type: msg.slice(0, 100)});
  });
}).observe(host, {childList: true, subtree: true});

/* ---------- HubSpot form ---------- */
if (!window.hbspt){
  host.innerHTML = '<div class="form-loading">The form didn\'t load. Please refresh, or email us at the address on spade.com.</div>';
} else hbspt.forms.create({
  portalId: CONFIG.hubspot.portalId,
  formId: CONFIG.hubspot.formId,
  region: CONFIG.hubspot.region,
  target: "#hs-form-host",
  css: "",                       // drop HubSpot's default styles; this page styles the form
  submitText: CONFIG.submitText,
  onFormReady: function($form){
    hsForm = ($form && $form.jquery) ? $form[0] : ($form || document.querySelector("#hs-form-host form"));
    renderQualifiers();          // re-read live options from HubSpot
    TRACK_KEYS.forEach(k => { if (tracking[k]) setField(k, tracking[k]); });
    setField("ab_variant", CONFIG.abVariant);
    applyFormMode(activeCard === finalCard);
    setField(CONFIG.formLocationField, activeCard === finalCard ? "footer" : "hero");
    // If a card already has a volume picked (fast clicker), sync it now.
    const picked = activeCard && activeCard.querySelector(".vol-select");
    if (picked && picked.value) setField(CONFIG.volumeField, picked.value);
  },
  onFormSubmit: function(){
    submittedData = {};
    if (hsForm) new FormData(hsForm).forEach((v,k) => submittedData[k] = v);
  },
  onFormSubmitted: function(){
    const card = activeCard || document.getElementById("hero-form-card");
    const first = submittedData.firstname ? `, ${submittedData.firstname}` : "";
    card.querySelector("[data-done-title]").textContent = `Thanks${first}. Your scheduler is opening.`;
    showStep(card, "done");
    track("lead_submit", {form: card.dataset.card, volume: submittedData[CONFIG.volumeField] || ""});
  }
});

/* ---------- RevenueHero router (popup scheduler on HubSpot submit) ---------- */
if (window.RevenueHero){
  window.hero = new RevenueHero({ routerId: CONFIG.revenueHeroRouterId });
  hero.schedule("hsForm_" + CONFIG.hubspot.formId);
}

window.addEventListener("message", ev => {
  const type = ev.data && ev.data.type;
  if (!type) return;
  const card = activeCard || document.getElementById("hero-form-card");
  if (type === "MEETING_BOOKED"){
    card.querySelector("[data-done-title]").textContent = "You're booked.";
    card.querySelector("[data-done-body]").textContent = "We'll send the invite and how to share your sample.";
    track("meeting_booked", {form: card.dataset.card});
  } else if (type === "PROSPECT_DISQUALIFIED"){
    card.querySelector("[data-done-title]").textContent = "Thanks, we've got your details.";
    card.querySelector("[data-done-body]").textContent = "Our team will follow up by email.";
    track("prospect_disqualified", {form: card.dataset.card});
  } else if (type === "CLOSE_DIALOG"){
    track("scheduler_closed", {form: card.dataset.card});
  } else if (type === "PAGE_LOADED"){
    track("scheduler_shown", {form: card.dataset.card});
  }
});

/* ---------- Merchant graph visual ---------- */
const VIZ = [
  () => `
    <div class="tk txn"><span class="k">Transaction</span><span class="v">PY *KBC01 BRAYTON</span></div><div class="connector"></div>
    <div class="mcard">
      <div class="mcard-h"><div class="avatar av-kaladi">K</div><div><b>Kaladi Brothers Coffee</b><span class="tag">via Payrix</span></div></div>
      <div class="mrow"><span>Category</span><span>Food and Drink › Cafes</span></div>
      <div class="mrow"><span>Address</span><span>6921 Brayton Dr<br>Anchorage, AK 99507</span></div>
      <div class="mrow"><span>Lat / long</span><span class="mono" style="font-size:12.5px">61.158281, −149.85405</span></div>
      <div class="mrow"><span>Channel</span><span>In store</span></div>
      <div class="mrow"><span>Website</span><span>kaladi.com</span></div>
      <div class="mrow"><span>Third party</span><span>Payrix, payment processor</span></div>
    </div>`,
  () => `
    <div class="tk txn"><span class="k">Transaction</span><span class="v">GOOGLE *TikTok Videos</span></div><div class="connector"></div>
    <div class="mcard">
      <div class="mcard-h"><div class="avatar av-black">T</div><div><b>TikTok</b><span class="tag">via Google</span></div></div>
      <div class="mrow"><span>Category</span><span>Technology › Software</span></div>
      <div class="mrow"><span>Website</span><span>tiktok.com</span></div>
      <div class="mrow"><span>Channel</span><span>Online</span></div>
      <div class="mrow"><span>Third party</span><span>Google, payment processor</span></div>
    </div>
    <div class="pairs">
      <div class="pair"><div class="tk txn"><span class="k">Transaction</span><span class="v">GOOGLE *Crunchyroll An</span></div><div class="line"></div>
        <div class="mcard-s"><div class="avatar av-crunchy">C</div><div><b>Crunchyroll</b><span class="tag">via Google</span></div></div></div>
      <div class="pair"><div class="tk txn"><span class="k">Transaction</span><span class="v">IC* COSTCO BY INSTACAR</span></div><div class="line"></div>
        <div class="mcard-s"><div class="avatar av-costco">C</div><div><b>Costco</b><span class="tag">via Instacart</span></div></div></div>
    </div>`,
  () => `
    <div class="org">
      <div class="lbl-p">Parent</div>
      <div class="node"><div class="avatar av-aws">A</div>Amazon.com, Inc.</div>
      <div class="stem"></div>
      <div class="kids" style="padding-top:20px">
        <div class="node"><div class="avatar av-amzn">A</div>Amazon</div>
        <div class="node"><div class="avatar av-aws">A</div>AWS</div>
        <div class="node"><div class="avatar av-prime">P</div>Prime</div>
      </div>
    </div>`,
  () => `
    <div class="changes">
      ${["Merchant IDs (MIDs) rotate","Processor changes","Business changes hands","Same terminal, new business"].map(t =>
        `<div class="tk chg">${t}<span class="ok">KEPT CURRENT</span></div>`).join("")}
    </div>`,
  () => `
    <div class="rails">
      ${[["Card","Monthly bill"],["ACH","Invoice"],["Wire","Invoice"]].map(([r,p],k) => `
        <div class="rcol"><span class="rpill${k===1?" on":""}">${r}</span>
          <div class="rcard"><div class="rcard-h"><div class="avatar av-aws">A</div><b>Amazon Web Services</b></div>
            <div class="rkv"><span>Paid as</span><span>${p}</span></div>
            <div class="rkv"><span>Counterparty</span><span class="sameid">Same ID</span></div></div></div>`).join("")}
    </div>`
];
const viz = document.getElementById("viz");
const feats = [...document.querySelectorAll(".feat")];
let current = 0, autoTimer = null, userTouched = false;
function setFeat(i){
  current = i;
  feats.forEach((f,j) => f.classList.toggle("on", j === i));
  viz.innerHTML = VIZ[i]();
}
feats.forEach((f,i) => f.addEventListener("click", () => { userTouched = true; clearInterval(autoTimer); setFeat(i); track("graph_tab", {item: feats[i].querySelector(".feat-h").textContent.replace(/^\d+/, "").trim()}); }));
setFeat(0);
// Auto-advance while in view until the visitor interacts
new IntersectionObserver(entries => entries.forEach(en => {
  clearInterval(autoTimer);
  if (en.isIntersecting && !userTouched) autoTimer = setInterval(() => setFeat((current + 1) % VIZ.length), 5000);
}), {threshold:.4}).observe(viz);

/* ---------- Wrong-merchant reveal ---------- */
new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting){ setTimeout(() => e.target.classList.add("revealed"), 400); o.disconnect(); } }), {threshold:.6})
  .observe(document.getElementById("wrong"));

/* ---------- FAQ ---------- */
document.querySelectorAll(".qa button").forEach(b => b.addEventListener("click", () => {
  const qa = b.parentElement, open = !qa.classList.contains("open");
  qa.classList.toggle("open", open); b.setAttribute("aria-expanded", open);
  if (open) track("faq_open", {item: b.firstChild.textContent.trim()});
}));

/* ---------- Nav border + mobile sticky CTA ---------- */
const nav = document.getElementById("nav"), mcta = document.getElementById("mobile-cta");
const demo = document.getElementById("demo");
let heroVisible = true, demoVisible = false;
function updateCta(){ mcta.classList.toggle("show", !heroVisible && !demoVisible); }
new IntersectionObserver(e => { heroVisible = e[0].isIntersecting; updateCta(); }).observe(heroCard);
new IntersectionObserver(e => { demoVisible = e[0].isIntersecting; updateCta(); }).observe(demo);
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 8), {passive:true});
