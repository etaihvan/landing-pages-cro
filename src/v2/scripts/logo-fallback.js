// Replace a logo that fails to load with its text wordmark.
function logoFallback(img){
  var map={Navan:["navan","font-style:italic"],Stripe:["stripe",""],Sardine:["Sardine",""],Coast:["coast",""],Mercury:["MERCURY","sm"],Bilt:["BILT","spaced"]};
  var m=map[img.alt]||[img.alt,""], sp=document.createElement("span");
  sp.textContent=m[0];
  if(m[1]==="sm"||m[1]==="spaced") sp.className=m[1]; else if(m[1]) sp.setAttribute("style",m[1]);
  img.replaceWith(sp);
}
