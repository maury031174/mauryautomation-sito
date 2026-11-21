// =====================================================
//  CONTATTI: compila qui i tuoi dati. Se un campo resta
//  vuoto, il relativo pulsante non compare sul sito.
// =====================================================
const CONTATTI = {
  email: "info@mauryautomation.it",
  whatsapp: "393899034232",   // 389 90 34 232 con prefisso Italia
};

(function () {
  document.getElementById("anno").textContent = new Date().getFullYear();

  // --- pulsanti contatto ---
  const box = document.getElementById("contatti-azioni");
  const aggiungi = (testo, href, primario) => {
    const a = document.createElement("a");
    a.className = "btn" + (primario ? " primary" : "");
    a.textContent = testo;
    a.href = href;
    if (href.startsWith("http")) { a.target = "_blank"; a.rel = "noopener"; }
    box.appendChild(a);
  };
  if (CONTATTI.whatsapp) aggiungi("Scrivimi su WhatsApp", "https://wa.me/" + CONTATTI.whatsapp, true);
  if (CONTATTI.email) aggiungi("Scrivimi una mail", "mailto:" + CONTATTI.email, !CONTATTI.whatsapp);
  if (!box.children.length) document.getElementById("contatti-hint").hidden = false;

  // --- riquadro novità: legge news.json (si aggiorna modificando solo quel file) ---
  fetch("news.json", { cache: "no-cache" })
    .then(r => (r.ok ? r.json() : null))
    .then(n => {
      if (!n || !n.attiva || !n.titolo) return;
      document.getElementById("news-titolo").textContent = n.titolo;
      document.getElementById("news-testo").textContent = n.testo || "";
      if (n.link) {
        const l = document.getElementById("news-link");
        l.href = n.link; l.hidden = false;
      }
      document.getElementById("novita").hidden = false;
    })
    .catch(() => {});
})();
