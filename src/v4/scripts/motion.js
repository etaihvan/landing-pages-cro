/* v4 motion: one-time reveals for the product visuals. Presentation only; no tracking here.
   Content is visible by default. The hidden start state applies only under html.js and
   prefers-reduced-motion: no-preference (see v4.css), and anything this script can't observe
   is shown at once, so a failure here never hides copy. */
(function(){
  var els = document.querySelectorAll("[data-reveal]");
  var show = function(el){ el.classList.add("in"); };
  if (!("IntersectionObserver" in window)) { els.forEach(show); return; }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting){ show(e.target); io.unobserve(e.target); } });
  }, {threshold: 0.2, rootMargin: "0px 0px -8% 0px"});
  els.forEach(function(el){ io.observe(el); });
  // Safety net: never leave anything hidden, e.g. for print or a stalled observer.
  addEventListener("beforeprint", function(){ els.forEach(show); });
  setTimeout(function(){ els.forEach(function(el){ if (el.getBoundingClientRect().top < innerHeight) show(el); }); }, 1500);
})();
