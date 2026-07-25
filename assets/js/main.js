const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const blogGrid = document.querySelector("[data-blog-grid]");
const blogList = document.querySelector("#blog-list");
const blogDetail = document.querySelector("#blog-detail");
const blogDetailContent = document.querySelector("[data-blog-detail]");
const blogBackButton = document.querySelector("[data-blog-back]");
const metaDescription = document.querySelector('meta[name="description"]');
const defaultDocumentTitle = document.title;
const defaultMetaDescription = metaDescription?.getAttribute("content") || "";
const WHATSAPP_URL = "https://wa.me/905374850529?text=Merhaba%20Song%C3%BCl%20Han%C4%B1m%2C%20web%20siteniz%20%C3%BCzerinden%20ula%C5%9F%C4%B1yorum.%20%C3%87ocuk%20geli%C5%9Fimi%20ve%20aile%20dan%C4%B1%C5%9Fmanl%C4%B1%C4%9F%C4%B1%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.";

const addWhatsAppContactButton = () => {
  const contactActions = document.querySelector(
    ".mini-contact-actions, .contact-links, .article-nav-actions"
  );
  if (!contactActions || contactActions.querySelector("[data-whatsapp-contact]")) return;

  const whatsappButton = document.createElement("a");
  whatsappButton.className = "button whatsapp-cta";
  whatsappButton.href = WHATSAPP_URL;
  whatsappButton.target = "_blank";
  whatsappButton.rel = "noopener noreferrer";
  whatsappButton.setAttribute("aria-label", "WhatsApp ile iletişime geç (yeni sekmede açılır)");
  whatsappButton.setAttribute("data-whatsapp-contact", "");
  whatsappButton.innerHTML = `
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M20 11.6a8 8 0 0 1-11.7 7.1L4 20l1.4-4.1A8 8 0 1 1 20 11.6Z"></path>
      <path d="M8.7 8.2c.2-.4.4-.4.7-.4h.4c.2 0 .3.1.4.4l.7 1.6c.1.3 0 .5-.2.7l-.5.6c-.2.2-.1.4 0 .6.5.9 1.3 1.7 2.2 2.2.2.1.4.2.6 0l.7-.8c.2-.2.4-.3.7-.2l1.6.8c.3.1.4.3.4.5 0 .3-.2 1.3-.8 1.8-.6.6-1.5.8-2.5.5-1.1-.3-2.6-1-4.1-2.4-1.2-1.1-2-2.4-2.3-3.5-.3-1-.1-1.8.4-2.4Z"></path>
    </svg>
    <span>WhatsApp ile İletişime Geç</span>
  `;
  contactActions.append(whatsappButton);
};

const BLOG_POSTS = [
  {
    id: "rutinler",
    category: "Rutinler",
    title: "Çocuk Gelişiminde Rutinlerin Önemi: Güven, Öz Düzenleme ve Günlük Yaşam Becerileri",
    detailTitle: "Çocuk Gelişiminde Rutinlerin Önemi: Güven, Öz Düzenleme ve Günlük Yaşam Becerileri",
    image: "assets/images/blog-rutin.jpeg",
    alt: "Çocuklarda uyku, oyun, yemek ve öz bakım rutinlerini anlatan bilgilendirici görsel",
    summary: "Çocuklarda rutinler neden önemlidir? Uyku, yemek, ödev ve ekran rutinlerinin gelişime katkısını; yaşa göre örnekleri ve uygulanabilir adımları keşfedin.",
    url: "blog/cocuklarda-rutinlerin-onemi/",
    seoTitle: "Çocuklarda Rutinlerin Önemi: Yaşa Göre Örnekler ve 7 Uygulanabilir Adım",
    metaDescription: "Çocuklarda rutinler neden önemlidir? Uyku, yemek, ödev ve ekran rutinlerinin gelişime katkısını; yaşa göre örnekleri ve uygulanabilir adımları keşfedin.",
  },
  {
    id: "dijital",
    category: "Dijital ebeveynlik",
    title: "Dijital Çağda Ebeveyn Olmak: Dijital Farkındalığınız Ne Düzeyde?",
    detailTitle: "Dijital Çağda Ebeveyn Olmak: Dijital Farkındalığınız Ne Düzeyde?",
    image: "assets/images/blog-dijital.png",
    alt: "Dijital ebeveynlik ve çocuklarda ekran kullanımı farkındalığını anlatan görsel",
    summary: "Dijital ebeveynlik nedir? Çocuğun ekran kullanımını süre, içerik, bağlam ve güvenlik açısından değerlendirin; dijital farkındalık kontrol listesini uygulayın.",
    url: "blog/dijital-ebeveynlik-farkindaligi/",
    seoTitle: "Dijital Ebeveynlik Nedir? Dijital Farkındalık Testi ve 10 Sağlıklı Adım",
    metaDescription: "Dijital ebeveynlik nedir? Çocuğun ekran kullanımını süre, içerik, bağlam ve güvenlik açısından değerlendirin; dijital farkındalık kontrol listesini uygulayın.",
  },
  {
    id: "ekran-kurallari",
    category: "Ekran kuralları",
    title: "Aile İçi Dijital Kullanım ve Ekran Kuralları Sözleşmesi Nasıl Hazırlanır?",
    detailTitle: "Aile İçi Dijital Kullanım ve Ekran Kuralları Sözleşmesi Nasıl Hazırlanır?",
    image: "assets/images/blog-ekran.png",
    alt: "Aile içi dijital kullanım ve ekran kuralları sözleşmesini anlatan görsel",
    summary: "Çocuklarla ekran kuralları nasıl belirlenir? Yaşa uyarlanabilir aile dijital kullanım sözleşmesini inceleyin; süre, içerik, güvenlik ve sonuçları birlikte planlayın.",
    url: "blog/aile-ici-ekran-kurallari-sozlesmesi/",
    seoTitle: "Aile İçi Ekran Kuralları Sözleşmesi: Ücretsiz Örnek ve Uygulama Rehberi",
    metaDescription: "Çocuklarla ekran kuralları nasıl belirlenir? Yaşa uyarlanabilir aile dijital kullanım sözleşmesini inceleyin; süre, içerik, güvenlik ve sonuçları birlikte planlayın.",
  },
  {
    id: "oyun",
    category: "Oyun",
    title: "Oyun Sadece Eğlence Değildir: Çocuğunuzun En Önemli “İşi”",
    detailTitle: "Oyun Sadece Eğlence Değildir: Çocuğunuzun En Önemli “İşi”",
    image: "assets/images/blog-oyun.jpeg",
    alt: "Oyunun çocuk gelişimindeki önemini anlatan bilgilendirici görsel",
    summary: "Oyun çocuk gelişimini nasıl destekler? Bilişsel, dil, motor ve sosyal-duygusal gelişime katkıları; yaşa göre oyun örnekleri ve ebeveyn önerileri.",
    url: "blog/oyunun-cocuk-gelisimindeki-onemi/",
    seoTitle: "Oyunun Çocuk Gelişimindeki Önemi: Yaşa Göre Oyunlar ve Ebeveyn Rehberi",
    metaDescription: "Oyun çocuk gelişimini nasıl destekler? Bilişsel, dil, motor ve sosyal-duygusal gelişime katkıları; yaşa göre oyun örnekleri ve ebeveyn önerileri.",
  },
  {
    id: "cogent-prep",
    category: "Bilişsel destek",
    title: "Öğrenmenin Nörolojik Altyapısını İnşa Etmek: COGENT ve PREP Programları",
    detailTitle: "Öğrenmenin Nörolojik Altyapısını İnşa Etmek: COGENT ve PREP Programları",
    image: "assets/images/blog-cogent-prep.png",
    alt: "COGENT ve PREP bilişsel müdahale programlarını temsil eden görsel",
    summary: "COGENT ve PREP programları nedir, kimlere uygulanır? PASS kuramını, uygulama sürecini, hedef becerileri ve bilimsel kanıtların sınırlarını öğrenin.",
    url: "blog/cogent-prep-programlari/",
    seoTitle: "COGENT ve PREP Nedir? PASS Temelli Bilişsel ve Okuma Programları Rehberi",
    metaDescription: "COGENT ve PREP programları nedir, kimlere uygulanır? PASS kuramını, uygulama sürecini, hedef becerileri ve bilimsel kanıtların sınırlarını öğrenin.",
  },
  {
    id: "degerlendirme",
    category: "Değerlendirme",
    title: "Çocuğumun Gelişimi Yolunda mı? Değerlendirme Testlerinin Gücü",
    detailTitle: "Çocuğumun Gelişimi Yolunda mı? Değerlendirme Testlerinin Gücü",
    image: "assets/images/blog-degerlendirme-testleri-rehberi.png",
    alt: "Çocuk gelişim değerlendirme testlerinin önemini anlatan bilgilendirici görsel",
    summary: "Çocuk gelişim testleri neyi ölçer? DENVER II, AGTE, Marmara İlköğretime Hazır Oluş, Portage ve MOXO’nun amaçlarını ve sınırlarını öğrenin.",
    url: "blog/cocuk-gelisim-testleri-degerlendirme/",
    seoTitle: "Çocuk Gelişim Testleri Nedir? DENVER II, AGTE, MOXO ve Değerlendirme Rehberi",
    metaDescription: "Çocuk gelişim testleri neyi ölçer? DENVER II, AGTE, Marmara İlköğretime Hazır Oluş, Portage ve MOXO’nun amaçlarını ve sınırlarını öğrenin.",
  },
];

const closeMenu = () => {
  document.body.classList.remove("nav-open");
  nav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
};

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    document.body.classList.toggle("nav-open", !isOpen);
    nav.classList.toggle("is-open", !isOpen);
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

const syncHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

const renderBlocks = (blocks) => blocks.map((block) => {
  if (block.type === "h2") return `<h2 class="article-section-title">${block.text}</h2>`;
  if (block.type === "h3") return `<h3>${block.text}</h3>`;
  if (block.type === "highlight") return `<div class="highlight-box">${block.text}</div>`;
  if (block.type === "cta") return `<div class="highlight-box article-cta">${block.text}</div>`;
  if (block.type === "list") return `<ul>${block.items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  return `<p>${block.text}</p>`;
}).join("");

const showBlogPost = (postId) => {
  const post = BLOG_POSTS.find((item) => item.id === postId);
  if (!post) return;
  const titleTag = post.titleTag === "h1" ? "h1" : "h2";
  if (post.seoTitle) {
    document.title = post.seoTitle;
  }
  if (post.metaDescription && metaDescription) {
    metaDescription.setAttribute("content", post.metaDescription);
  }

  blogDetailContent.innerHTML = `
    <div class="article-image-container">
      <img src="${post.image}" alt="${post.alt}">
    </div>
    <div class="article-content">
      <p class="eyebrow">${post.category}</p>
      <${titleTag} class="article-title">${post.detailTitle}</${titleTag}>
      ${renderBlocks(post.blocks)}
    </div>
  `;

  blogList.hidden = true;
  blogDetail.hidden = false;
  blogBackButton.focus({ preventScroll: true });
  document.querySelector("#blog-content").scrollIntoView({ behavior: "smooth", block: "start" });
};

const hideBlogPost = () => {
  blogDetail.hidden = true;
  blogList.hidden = false;
  blogDetailContent.innerHTML = "";
  document.title = defaultDocumentTitle;
  if (metaDescription) {
    metaDescription.setAttribute("content", defaultMetaDescription);
  }
  document.querySelector("#blog-content").scrollIntoView({ behavior: "smooth", block: "start" });
};

const renderBlogCards = () => {
  if (!blogGrid) return;
  blogGrid.innerHTML = BLOG_POSTS.map((post) => `
    <a class="blog-card" href="${post.url}" aria-label="${post.title} yazısını aç">
      <img src="${post.image}" alt="${post.alt}" loading="lazy">
      <div class="blog-card-body">
        <span>${post.category}</span>
        <h3>${post.title}</h3>
        <p>${post.summary}</p>
      </div>
    </a>
  `).join("");
};

syncHeader();
renderBlogCards();
addWhatsAppContactButton();
if (blogBackButton) {
  blogBackButton.addEventListener("click", hideBlogPost);
}
window.addEventListener("scroll", syncHeader, { passive: true });

const revealItems = document.querySelectorAll(".reveal, .reveal-group > *");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  observer.observe(item);
});
