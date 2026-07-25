(function () {
  const scriptUrl = document.currentScript?.src
    ? new URL(document.currentScript.src)
    : new URL("assets/js/chatbot.js", document.baseURI);
  const DATA_URL = new URL("../data/cocuk_gelisimi_sss_bot_verisi.json", scriptUrl).href;
  const FALLBACK_RESPONSE = "Bu konuda genel bilgilendirme yapabilirim; ancak çocuğunuzun durumuna özel değerlendirme için iletişim formu üzerinden randevu talebi oluşturmanız daha uygun olur.";
  const SAFETY_RESPONSE = "Bu konu acil, kriz, istismar, ihmal veya tıbbi risk içerebilir. Web sitesi üzerinden yanıt beklemek yerine en yakın acil sağlık birimine veya ilgili resmi destek mekanizmalarına başvurmanız gerekir.";
  const quickQuestions = [
    "Hangi hizmet uygun?",
    "MOXO nedir?",
    "Marmara Ölçeği nedir?",
    "İlk görüşme nasıl ilerler?",
    "Randevu nasıl alınır?"
  ];
  const emergencyTerms = ["acil", "istismar", "ihmal", "kriz", "kendine zarar", "başkasına zarar", "intihar", "tıbbi", "bilinç", "şiddet"];
  let faqs = [];
  let isOpen = false;

  const normalize = (value) => String(value || "")
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

  const escapeHtml = (value) => String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  const widget = document.createElement("section");
  widget.className = "chatbot-widget";
  widget.setAttribute("aria-label", "Gelişim Rehberi");
  widget.innerHTML = `
    <button class="chatbot-toggle" type="button" aria-expanded="false" aria-controls="chatbot-panel">
      <span class="chatbot-toggle-icon" aria-hidden="true">?</span>
      <span>Gelişim Rehberi</span>
    </button>
    <div class="chatbot-panel" id="chatbot-panel" hidden>
      <div class="chatbot-header">
        <div>
          <p>Gelişim Rehberi</p>
          <span>Genel bilgilendirme sunar; tanı ve değerlendirme yerine geçmez.</span>
        </div>
        <button class="chatbot-close" type="button" aria-label="Chatbotu kapat">×</button>
      </div>
      <div class="chatbot-messages" role="log" aria-live="polite"></div>
      <div class="chatbot-quick" aria-label="Hızlı sorular"></div>
      <form class="chatbot-form">
        <label class="sr-only" for="chatbot-input">Mesajınız</label>
        <input id="chatbot-input" type="text" autocomplete="off" placeholder="Sorunuzu yazın">
        <button type="submit">Gönder</button>
      </form>
    </div>
  `;
  document.body.appendChild(widget);

  const toggleButton = widget.querySelector(".chatbot-toggle");
  const closeButton = widget.querySelector(".chatbot-close");
  const panel = widget.querySelector(".chatbot-panel");
  const messages = widget.querySelector(".chatbot-messages");
  const quickWrap = widget.querySelector(".chatbot-quick");
  const form = widget.querySelector(".chatbot-form");
  const input = widget.querySelector("#chatbot-input");

  const addMessage = (text, sender = "bot") => {
    const message = document.createElement("div");
    message.className = `chatbot-message ${sender}`;
    message.innerHTML = escapeHtml(text);
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  };

  const addBotAnswer = (faq) => {
    if (!faq) {
      addMessage(FALLBACK_RESPONSE);
      return;
    }
    const parts = [faq.answer];
    if (faq.cta) parts.push(faq.cta);
    parts.push("Lütfen kişisel sağlık verisi veya çocuğunuza ait hassas bilgileri sohbet alanına yazmayın.");
    addMessage(parts.join("\n\n"));
  };

  const scoreFaq = (query, faq) => {
    const normalizedQuery = normalize(query);
    const words = normalizedQuery.split(" ").filter((word) => word.length > 2);
    const keywordText = Array.isArray(faq.keywords) ? faq.keywords.join(" ") : "";
    const haystack = normalize(`${faq.category} ${faq.question} ${faq.answer} ${keywordText}`);
    let score = 0;
    if (haystack.includes(normalizedQuery)) score += 8;
    for (const word of words) {
      if (haystack.includes(word)) score += 1;
    }
    if (normalize(faq.question).includes(normalizedQuery)) score += 6;
    return score;
  };

  const findAnswer = (query) => {
    const normalizedQuery = normalize(query);
    if (emergencyTerms.some((term) => normalizedQuery.includes(normalize(term)))) {
      return { safety: true };
    }
    if (normalizedQuery.includes("randevu") || normalizedQuery.includes("iletisim")) {
      const appointmentFaq = faqs.find((faq) => normalize(faq.question).includes("randevu"));
      if (appointmentFaq) return { faq: appointmentFaq };
    }
    if (normalizedQuery.includes("hangi hizmet") || normalizedQuery.includes("uygun hizmet")) {
      const serviceFaq = faqs.find((faq) => normalize(faq.question).includes("ne zaman destek"));
      if (serviceFaq) return { faq: serviceFaq };
    }
    if (normalizedQuery.includes("moxo")) {
      const moxoFaq = faqs.find((faq) => normalize(faq.question).includes("moxo dikkat testi nedir"));
      if (moxoFaq) return { faq: moxoFaq };
    }
    if (normalizedQuery.includes("marmara") || normalizedQuery.includes("hazir olus")) {
      const marmaraFaq = faqs.find((faq) => normalize(faq.question).includes("marmara ilkokula hazir olus olcegi nedir"));
      if (marmaraFaq) return { faq: marmaraFaq };
    }
    if (normalizedQuery.includes("ilk gorusme")) {
      const firstMeetingFaq = faqs.find((faq) => normalize(faq.question).includes("ilk gorusmede"));
      if (firstMeetingFaq) return { faq: firstMeetingFaq };
    }
    let best = null;
    let bestScore = 0;
    for (const faq of faqs) {
      const score = scoreFaq(query, faq);
      if (score > bestScore) {
        best = faq;
        bestScore = score;
      }
    }
    return bestScore >= 2 ? { faq: best } : {};
  };

  const ask = (query) => {
    const cleaned = query.trim();
    if (!cleaned) return;
    addMessage(cleaned, "user");
    const result = findAnswer(cleaned);
    if (result.safety) {
      addMessage(SAFETY_RESPONSE);
      return;
    }
    addBotAnswer(result.faq);
  };

  const setOpen = (nextOpen) => {
    isOpen = nextOpen;
    panel.hidden = !isOpen;
    toggleButton.setAttribute("aria-expanded", String(isOpen));
    widget.classList.toggle("is-open", isOpen);
    if (isOpen) {
      window.setTimeout(() => input.focus(), 80);
    }
  };

  quickQuestions.forEach((question) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = question;
    button.addEventListener("click", () => ask(question));
    quickWrap.appendChild(button);
  });

  toggleButton.addEventListener("click", () => setOpen(!isOpen));
  closeButton.addEventListener("click", () => setOpen(false));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    ask(input.value);
    input.value = "";
  });

  addMessage("Merhaba, ben Gelişim Rehberi. Çocuk gelişimi, değerlendirme araçları, dikkat, okul hazırlığı, aile danışmanlığı ve danışmanlık süreci hakkında genel bilgi verebilirim. Paylaştığım bilgiler tanı ya da bireysel değerlendirme yerine geçmez; çocuğunuzun durumuna özel yönlendirme için uzman görüşmesi önerilir.");

  fetch(DATA_URL)
    .then((response) => {
      if (!response.ok) throw new Error("SSS veri dosyası okunamadı.");
      return response.json();
    })
    .then((data) => {
      faqs = Array.isArray(data.faqs) ? data.faqs : [];
      if (!faqs.length) {
        addMessage("SSS veri dosyası yüklendi; ancak içinde soru-cevap kaydı bulunamadı.");
      }
    })
    .catch(() => {
      addMessage("SSS veri dosyası şu anda okunamadı. JSON fetch için site local server üzerinden çalıştırılmalıdır.");
    });
})();
