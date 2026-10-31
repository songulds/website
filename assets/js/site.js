/* Ana sayfa ve Hizmetler sayfası için küçük yardımcılar (main.js'e dokunmaz) */
document.addEventListener("click", function (e) {
  var j = e.target.closest("[data-jump]");
  if (j) {
    var card = document.getElementById("card-" + j.dataset.jump);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.remove("flash");
      void card.offsetWidth;
      card.classList.add("flash");
    }
    return;
  }
  var s = e.target.closest("[data-sjump]");
  if (s) {
    var target = document.getElementById(s.dataset.sjump);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

/* İletişim formu: Formspree'ye JS ile gönderir, sayfada teşekkür mesajı gösterir.
   JS çalışmazsa form normal POST ile Formspree'ye gider. */
(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;
  var status = document.getElementById("form-status");
  var btn = form.querySelector('button[type="submit"]');
  function say(text, ok) {
    status.textContent = text;
    status.className = "form-status " + (ok ? "is-ok" : "is-error");
    status.focus();
  }
  window.__showFormThanks = function () {
    say("Teşekkürler, mesajınız bana ulaştı. Yazdığınız e-posta adresinden size dönüş yapacağım.", true);
  };
  form.addEventListener("submit", function (e) {
    if (!window.fetch || !window.FormData) return;
    e.preventDefault();
    var gotcha = form.querySelector('[name="_gotcha"]');
    if (gotcha && gotcha.value) { window.__showFormThanks(); return; }
    var label = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Gönderiliyor";
    fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
      .then(function (r) {
        if (!r.ok) throw new Error("http " + r.status);
        form.reset();
        window.__showFormThanks();
      })
      .catch(function () {
        say("Mesaj gönderilemedi. Lütfen tekrar deneyin ya da songuldakaksoylu@gmail.com adresine yazın.", false);
      })
      .then(function () { btn.disabled = false; btn.textContent = label; });
  });
})();
