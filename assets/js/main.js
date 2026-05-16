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

const BLOG_POSTS = [
  {
    id: "rutinler",
    category: "Rutinler",
    title: "Rutinlerin Çocuğunuzun Dünyasındaki Önemi",
    detailTitle: "Çocuk Gelişiminde Gizli Kahraman: Rutinlerin Çocuğunuzun Dünyasındaki Önemi",
    image: "assets/images/blog-rutin.jpeg",
    alt: "Çocuk gelişiminde rutinlerin önemini anlatan bilgilendirici görsel",
    summary: "Günlük yaşam rutinleri güven duygusu, duygu düzenleme ve özdenetim becerilerini nasıl destekler?",
    blocks: [
      { type: "p", text: "Bir çocuk için dünya bazen çok karmaşık ve öngörülemez olabilir. Bu noktada \"rutinler\", çocuklara güvenli bir liman sunar. Akademik çalışmalarımda da odaklandığım gibi, günlük yaşam rutinleri sadece birer alışkanlık değil, çocuğun bilişsel ve duygusal gelişimi için temel birer yapı taşıdır. Rutinler, çocuğun yaşamını anlamlandırmasına yardımcı olan tekrarlayan etkileşimler bütünüdür." },
      { type: "p", text: "Bilimsel literatürde rutinlerin gücü şu temel alanlarda kendini göstermektedir:" },
      { type: "list", items: ["<b>Güven Duygusu:</b> Ne zaman yemek yiyeceğini veya ne zaman uyuyacağını bilen çocuk, belirsizliğin getirdiği kaygıdan uzaklaşır. Bu öngörülebilirlik, çocuğun çevresine karşı temel bir güven geliştirmesini sağlar.", "<b>Duygu Regülasyonu:</b> Yapılan güncel araştırmalar, özellikle okul çağı çocuklarında düzenli rutinlere sahip olma ile duygu düzenleme becerileri arasında doğrudan bir ilişki olduğunu ortaya koymaktadır. Rutinler, çocuğun duygusal dalgalanmalarla başa çıkması için gereken yapısal desteği sunar.", "<b>Özdenetim Becerisi ve Sorumluluk:</b> Rutinler; ev içi sorumluluklar, disiplin rutinleri ve ev ödevi rutinleri gibi alt boyutları sayesinde çocukların kendi sorumluluklarını daha kolay üstlenmesini sağlar. Bu düzen, çocuğun özdenetim mekanizmalarını geliştirerek akademik başarıyı destekler.", "<b>Bütüncül Gelişim:</b> Çocuk rutinleri, bireyi hem gelişimsel hem de akademik olarak desteklemesi bakımından kritik bir öneme sahiptir. 5-12 yaş arası okul çağı çocuklarında günlük yaşam rutinlerinin varlığı, sağlıklı bir gelişimsel sürecin göstergesidir."] },
      { type: "highlight", text: "Evinizde oluşturacağınız basit ama sürdürülebilir rutinler, çocuğunuzun akademik ve sosyal başarısına doğrudan katkı sağlar. Unutmayın, rutinler sadece \"kurallar\" değil, çocuğunuzla kurduğunuz bağın ve onun gelişim yolculuğuna sunduğunuz rehberliğin bir yansımasıdır." },
      { type: "h3", text: "1. Rutinlerinizi Kategorize Edin" },
      { type: "p", text: "Araştırmalar, rutinlerin sadece \"uyku\"dan ibaret olmadığını gösterir. Etkiyi artırmak için şu dört alanı dengeleyin:" },
      { type: "list", items: ["<b>Günlük Yaşam Rutinleri:</b> Yemek saatleri, öz bakım ve kişisel hijyen alışkanlıklarını sabitleyin.", "<b>Ev İçi Sorumluluklar:</b> Çocuğun yaşına uygun küçük görevler vererek (sofrayı kurma, oyuncak toplama) aidiyet duygusunu güçlendirin.", "<b>Disiplin Rutinleri:</b> Kuralların ve sınırların tutarlı olması, çocuğun öngörülebilirlik içinde kendini güvende hissetmesini sağlar.", "<b>Ev Ödevi Rutinleri:</b> Ders çalışma saatlerini bir düzene oturtarak akademik başarıyı destekleyin."] },
      { type: "h3", text: "2. Duygu Regülasyonu İçin \"Geçiş\" Ritüelleri Oluşturun" },
      { type: "p", text: "Okul çağı çocuklarında rutinler ile duygu yönetimi arasında güçlü bir bağ vardır." },
      { type: "list", items: ["<b>Okul Dönüşü Paylaşımı:</b> Her gün okuldan geldiğinde 10 dakikalık bir \"günün en iyi/en zor anı\" sohbeti yaparak duygularını ifade etmesine alan açın.", "<b>Uyku Öncesi Rahatlama:</b> Kitap okuma veya sakin bir müzik eşliğinde günü kapatma gibi ritüeller, çocuğun kaygı seviyesini düşürerek uyku kalitesini artırır."] },
      { type: "h3", text: "3. Esneklik Payı Bırakın" },
      { type: "p", text: "Rutinler bir \"hapishane\" değil, \"iskele\" olmalıdır. Hafta sonları veya tatil dönemlerinde rutinlerde esneklik tanıyarak çocuğun değişen durumlara uyum sağlama (adaptasyon) becerisini destekleyin." },
      { type: "h3", text: "4. Görsel Hatırlatıcılar Kullanın" },
      { type: "p", text: "Özellikle 5-12 yaş grubundaki çocuklar için görsel şemalar çok etkilidir. Bir \"Rutin Tablosu\" hazırlayarak çocuğun tamamladığı görevlerin yanına çıkartma yapıştırmasına izin verin. Bu, hem özdenetim becerisini geliştirir hem de süreci eğlenceli hale getirir." },
      { type: "h3", text: "5. Rutinleri Bağ Kurma Aracı Olarak Görün" },
      { type: "p", text: "Rutinler sadece işlerin yürümesini sağlamaz, aynı zamanda çocukla ebeveyn arasındaki bağı kuvvetlendirir. Birlikte mutfakta vakit geçirmek veya akşam yemeği hazırlamak gibi rutinler, çocuğun sosyal gelişimine ve aile içi iletişime doğrudan katkı sağlar." }
    ]
  },
  {
    id: "dijital",
    category: "Dijital ebeveynlik",
    title: "Dijital Çağda Ebeveyn Olmak",
    detailTitle: "Dijital Çağda Ebeveyn Olmak: Dijital Farkındalığınız Ne Düzeyde?",
    image: "assets/images/blog-dijital.png",
    alt: "Dijital çağda ebeveynlik ve çocuk gelişimi temalı pastel illüstrasyon",
    summary: "Ekran süresini yasaklarla değil, farkındalık ve rehberlikle yönetmek için bilimsel bir çerçeve.",
    blocks: [
      { type: "p", text: "Günümüzde çocukları ekranlardan tamamen uzak tutmak neredeyse imkansızdır. Ancak gelişimsel açıdan kritik olan nokta ekran süresinin miktarından ziyade, bu sürenin \"nasıl\" yönetildiğidir. Özellikle ilkokul dönemi çocuğu olan ebeveynlerin dijital ebeveynlik farkındalık düzeyleri, çocuğun hem internet dünyasındaki güvenliğini hem de psikososyal gelişimini belirleyen en temel faktördür." },
      { type: "p", text: "Dijital dünyada sağlıklı bir denge kurabilmek için bilimsel temelli şu yaklaşımlar öne çıkmaktadır:" },
      { type: "h3", text: "Rehber Olun, Yasakçı Değil" },
      { type: "p", text: "Çocuğunuzla birlikte dijital içerikleri keşfetmek ve bu süreçte açık bir iletişim kanalı oluşturmak kritik önem taşır. Yapılan araştırmalar, ebeveynlerin dijital araçlara yönelik farkındalıklarının, çocukların risklere karşı korunmasında doğrudan etkili olduğunu göstermektedir. Yasaklamak yerine dijital okuryazarlık becerilerini birlikte geliştirmek, çocuğun otokontrol mekanizmasını güçlendirir." },
      { type: "h3", text: "Ekran ve Gelişim İlişkisi" },
      { type: "p", text: "Kontrolsüz ekran kullanımı; çocuğun sosyal becerilerini, dil gelişimini ve dikkat süresini olumsuz etkileyebilir. Bilimsel veriler, ekran başında geçen sürenin fiziksel aktivitelerin, sosyal etkileşimlerin ve en önemlisi uyku rutinlerinin önüne geçmemesi gerektiğini vurgular." },
      { type: "h3", text: "Ebeveyn Denetimi ve Sınırlar" },
      { type: "p", text: "Dijital dünyada sınırlar belirlemek, çocuğun fiziksel dünyadaki temel ihtiyaçlarını korumak için gereklidir." },
      { type: "list", items: ["<b>Güvenli İnternet Kullanımı:</b> Yaşa uygun filtreleme sistemlerini kullanın ancak en güçlü filtrenin ebeveyn rehberliği olduğunu unutmayın.", "<b>Rutinleri Koruyun:</b> Dijital etkinliklerin; uyku, yemek ve oyun gibi çocuğun gelişimsel rutinlerini bozmasına izin vermeyin."] }
    ]
  },
  {
    id: "ekran-kurallari",
    category: "Ekran kuralları",
    title: "Ekran Kuralları Sözleşmesi",
    detailTitle: "Aile İçi Dijital Kullanım ve Ekran Kuralları Sözleşmesi",
    image: "assets/images/blog-ekran.png",
    alt: "Aile içi ekran kuralları sözleşmesini anlatan pastel illüstrasyon",
    summary: "Teknolojiyi gelişimi destekleyen bir araç olarak kullanırken aile bağını ve rutinleri koruyan çerçeve.",
    blocks: [
      { type: "p", text: "Bu sözleşme, [Çocuğun Adı] ve [Ebeveynlerin Adı] arasında, dijital dünyada güvenli, dengeli ve keyifli vakit geçirmek amacıyla hazırlanmıştır. Amacımız, teknolojiyi gelişimimizi destekleyen bir araç olarak kullanırken fiziksel dünyadaki rutinlerimizi ve birbirimizle olan bağımızı korumaktır." },
      { type: "h3", text: "1. Zaman Sınırları ve Öncelikler" },
      { type: "list", items: ["<b>Önce Sorumluluklar:</b> Ekran süresi; ödev rutinleri, ev içi sorumluluklar ve fiziksel oyun saati tamamlandıktan sonra başlar.", "<b>Süre Sınırı:</b> Günlük ekran süresi hafta içi [X] dakika, hafta sonu [X] dakika olarak belirlenmiştir.", "<b>Uyku Hijyeni:</b> Uyku rutinlerini korumak adına, yatma saatinden en az 1 saat önce tüm dijital cihazlarla vedalaşılır."] },
      { type: "h3", text: "2. Mekan Sınırları (Ekransız Bölgeler)" },
      { type: "list", items: ["<b>Yemek Masası:</b> Yemek saatleri, aile içi iletişimin önceliği olduğu için \"ekransız bölge\"dir.", "<b>Yatak Odası:</b> Cihazlar gece boyunca yatak odası dışında, ortak belirlenen bir \"şarj istasyonunda\" dinlenir."] },
      { type: "h3", text: "3. Güvenli İçerik ve Dijital Nezaket" },
      { type: "list", items: ["<b>Birlikte Keşif:</b> Yeni bir uygulama indirmeden veya yeni bir web sitesine girmeden önce ebeveynlere danışılır.", "<b>Kişisel Bilgiler:</b> Ad, soyad, adres ve okul ismi gibi kişisel bilgiler dijital dünyada kimseyle paylaşılmaz.", "<b>Nezaket:</b> Dijital dünyada da gerçek hayatta olduğu gibi nazik ve saygılı bir dil kullanılır."] },
      { type: "h3", text: "4. Ebeveynlerin Sözü" },
      { type: "p", text: "Ebeveynler olarak biz de çocuğumuzla vakit geçirirken telefonlarımızı bir kenara bırakacağımıza ve dijital ebeveynlik farkındalığımızı artırmak için model olacağımıza söz veriyoruz." },
      { type: "h3", text: "5. Kurallara Uyulmadığında Ne Olur?" },
      { type: "p", text: "Eğer belirlenen süre aşılırsa veya kurallar ihlal edilirse, bir sonraki günün ekran süresinden [X] dakika eksiltilecektir." },
      { type: "highlight", text: "<b>İmza (Çocuk):</b> ____________________<br><b>İmza (Ebeveyn):</b> ____________________<br><b>Tarih:</b> ___ / ___ / 2026" },
      { type: "p", text: "<b>Neden Bu Sözleşmeyi Yapmalısınız?:</b> Akademik çalışmaların da vurguladığı gibi, ebeveynlerin dijital farkındalığı arttıkça çocukların gelişimi güçlenmektedir. Bu sözleşme, ekran süresini bir özdenetim becerisi haline getirmeyi amaçlar." },
      { type: "list", items: ["<b>5-7 Yaş:</b> Sözleşme daha çok görsel hatırlatıcılarla (stickerlar, resimli tablolar) desteklenmelidir.", "<b>8-12 Yaş:</b> Bu dönemde çocuk, sözleşme maddelerinin belirlenme sürecine aktif olarak dahil edilmelidir."] }
    ]
  },
  {
    id: "oyun",
    category: "Oyun",
    title: "Oyun Sadece Eğlence Değildir",
    detailTitle: "Oyun Sadece Eğlence Değildir: Çocuğunuzun En Önemli \"İşi\"",
    image: "assets/images/blog-oyun.jpeg",
    alt: "Oyunun çocuk gelişimindeki önemini anlatan bilgilendirici görsel",
    summary: "Piaget, Montessori ve Vygotsky ışığında oyunun çocuğun bilişsel ve sosyal gelişimindeki yeri.",
    blocks: [
      { type: "p", text: "Pek çok ebeveyn için oyun, çocukların boş vakitlerini değerlendirdiği bir eğlence aracıdır. Ancak çocuk gelişiminin dâhileri olan Piaget ve Montessori’ye göre oyun, bir çocuğun hayattaki en ciddi uğraşıdır. Akademik araştırmalar da gösteriyor ki, çocuk oyun oynarken aslında gelecekteki başarısının temellerini atıyor." },
      { type: "p", text: "İşte dünyaca ünlü uzmanların gözünden, çocuğunuzun oyun oynarken aslında neler başardığı:" },
      { type: "h3", text: "1. Dünyayı Anlama Çabası (Jean Piaget)" },
      { type: "p", text: "Çocuk psikolojisinin öncüsü Piaget’ye göre, bir çocuk bir çubuğu \"at\" gibi kullandığında veya mutfak eşyalarıyla yemek yapıyormuş gibi davrandığında aslında beyni müthiş bir hızla çalışıyordur." },
      { type: "list", items: ["<b>Keşif:</b> Çocuk, nesneleri birbirine vurarak veya fırlatarak neden-sonuç ilişkisini öğrenir.", "<b>Hayal Gücü:</b> Sembolik oyunlar (taklit oyunları), çocuğun bir şeyi başka bir şeyin yerine koyabilme yeteneğini geliştirir; bu da ilerideki matematik ve okuma becerilerinin temelidir."] },
      { type: "h3", text: "2. Kendini İnşa Etme Süreci (Maria Montessori)" },
      { type: "p", text: "Montessori, \"Oyun, çocuğun işidir\" der. Ona göre çocuk, bir kuleyi defalarca devirip yeniden yaparken sadece eğlenmez, kendi iç disiplinini ve odaklanma becerisini geliştirir." },
      { type: "list", items: ["<b>Bağımsızlık:</b> Çocuk kendi oyununu seçtiğinde özgüveni artar.", "<b>Dikkat Süresi:</b> Bir oyuna derinlemesine daldığında, yetişkinlerin iş hayatındaki konsantrasyon becerisinin ilk provalarını yapar."] },
      { type: "h3", text: "3. Sosyal Kuralları Öğrenme (Lev Vygotsky)" },
      { type: "p", text: "Vygotsky'ye göre oyun, çocuğun \"kendi boyundan büyük\" işler başardığı bir alandır." },
      { type: "list", items: ["<b>Sınırları Tanıma:</b> Arkadaşıyla oyun oynarken sırasını beklemeyi ve paylaşmayı öğrenir.", "<b>Problem Çözme:</b> \"Şimdi ne oynayalım?\" veya \"Bu kule neden yıkıldı?\" soruları, çocuğun sosyal zekasını parlatır."] },
      { type: "highlight", text: "<b>Oyun Her Yerde Aynı!</b><br>Kendi yaptığım araştırmalarda da gördüğüm bir gerçek var: Dünyanın neresine giderseniz gidin, altı kıtadaki çocukların oyunları birbirine çok benziyor. Türkiye’deki bir çocuğun saklambaç oynamasıyla, dünyanın öbür ucundaki bir çocuğun benzer bir oyun kurması, oyunun insan gelişiminin evrensel ve ortak bir dili olduğunu kanıtlıyor." },
      { type: "p", text: "<b>Ebeveynlere Küçük Bir Tavsiye:</b> Çocuğunuzla yere çöküp onun kurallarına göre oyun oynadığınız her an, onun beyin gelişimine dev bir katkı sağlıyorsunuz. Siz sadece bir oyuncak arkadaşı değil, onun dünyasındaki \"yeni bağlantıların\" mimarısınız." }
    ]
  },
  {
    id: "cogent-prep",
    category: "Bilişsel destek",
    title: "COGENT ve PREP Programları",
    detailTitle: "Öğrenmenin Nörolojik Altyapısını İnşa Etmek: COGENT ve PREP Programları",
    image: "assets/images/blog-cogent-prep.png",
    alt: "COGENT ve PREP programlarını temsil eden pastel akademik illüstrasyon",
    summary: "Öğrenmenin nörolojik altyapısını güçlendiren yapılandırılmış değerlendirme ve müdahale süreçleri.",
    blocks: [
      { type: "h3", text: "1. COGENT: Okula Hazır Bir Zihin İçin İlk Adım" },
      { type: "p", text: "<b>Bilişsel Gelişime Hazırlık Programı</b>" },
      { type: "p", text: "<b>Kimlere Uygulanır?:</b> Okul olgunluğu kazanmak isteyen, dikkat süresini artırmaya ihtiyaç duyan veya temel kavramları (sıralama, gruplama, planlama) oturtmakta güçlük çeken tüm çocuklara uygulanabilir.<br><b>Yaş Aralığı:</b> Genellikle 4 - 7 yaş (Okul öncesi ve ilkokul 1. sınıf) aralığındaki çocuklar için tasarlanmıştır.<br><b>Nasıl Uygulanır?:</b> Toplam 5 modülden oluşur. Uzman eşliğinde, çocuğun seviyesine göre haftalık seanslar şeklinde ilerlenir. Programda özel hikaye kitapları, kavram kartları ve oyun materyalleri kullanılır. Çocuk, pasif bir dinleyici değil; strateji geliştiren aktif bir katılımcıdır." },
      { type: "h3", text: "2. PREP: Okumanın Görünmeyen Kahramanı" },
      { type: "p", text: "<b>Okumayı Geliştirme ve Bilgi İşleme Süreçleri</b>" },
      { type: "p", text: "<b>Kimlere Uygulanır?:</b> Okuma-yazma öğrenmekte zorlanan, harfleri karıştıran, yavaş okuyan veya okuduğunu anlamakta güçlük çeken çocuklar için idealdir. Ayrıca disleksi (özel öğrenme güçlüğü) riski taşıyan veya tanısı almış çocuklar için bilimsel bir müdahale programıdır.<br><b>Yaş Aralığı:</b> Okuma-yazma öğretiminin başladığı dönemden itibaren, genellikle 7 yaş ve üzeri tüm okul çağı çocuklarına uygulanabilir.<br><b>Nasıl Uygulanır?:</b> PREP seansları, \"Okuma Temelli\" ve \"Okuma Temelli Olmayan\" görevler olarak ikiye ayrılır. İlk aşamada doğrudan harflerle değil, beynin işlemleme hızını artıran görsel ve işitsel oyunlarla çalışılır. Çocuk temeldeki bilişsel sorunu çözdüğünde, akademik başarı kendiliğinden hızlanır." },
      { type: "highlight", text: "<b>Uygulama Süreci ve Düzen:</b><br>Bu programlar rastgele etkinlikler bütünü değil, bir müdahale protokolüdür. <b>Ön Değerlendirme</b> ile bilişsel profil analiz edilir, <b>Bireysel Planlama</b> ile seans yoğunluğu belirlenir ve <b>Takip</b> süreciyle aileye düzenli geri bildirim verilir." }
    ]
  },
  {
    id: "degerlendirme",
    category: "Değerlendirme",
    title: "Değerlendirme Testlerinin Gücü",
    detailTitle: "Çocuğumun Gelişimi Yolunda mı? Değerlendirme Testlerinin Gücü",
    titleTag: "h1",
    image: "assets/images/blog-degerlendirme-testleri-rehberi.png",
    alt: "Çocuk gelişim değerlendirme testlerinin önemini anlatan bilgilendirici görsel",
    summary: "DENVER II, AGTE, Marmara İlkokula Hazır Oluş Ölçeği, Portage, MOXO, PREP ve COGENT hakkında ebeveynler için rehber.",
    seoTitle: "Çocuğumun Gelişimi Yolunda mı? Çocuk Gelişim Testleri ve Değerlendirmenin Önemi",
    slug: "cocuk-gelisim-testleri-degerlendirme",
    metaDescription: "Çocuğunuzun gelişimi yaşına uygun ilerliyor mu? DENVER II, AGTE, Marmara İlkokula Hazır Oluş Ölçeği, Portage, MOXO Dikkat Testi, PREP ve COGENT hakkında ebeveynler için bilimsel ve anlaşılır rehber.",
    keywords: "çocuk gelişim testi, çocuk gelişimi değerlendirme, gelişimsel değerlendirme, DENVER II testi, AGTE testi, Ankara Gelişim Tarama Envanteri, Marmara İlkokula Hazır Oluş Ölçeği, okul olgunluğu testi, Portage erken eğitim programı, MOXO dikkat testi, çocuklarda dikkat testi, okul öncesi değerlendirme, çocuk gelişimi uzmanı",
    blocks: [
      { type: "p", text: "Her çocuk kendi gelişim ritmiyle büyür. Kimi çocuk erken konuşur, kimi motor becerilerde daha hızlı ilerler, kimi çocuk ise sosyal-duygusal becerilerde biraz daha zamana ihtiyaç duyabilir. Bu bireysel farklılıklar gelişimin doğal bir parçasıdır. Ancak ebeveynler için zaman zaman şu soru gündeme gelebilir:" },
      { type: "highlight", text: "<b>“Çocuğumun gelişimi yaşına uygun ilerliyor mu?”</b>" },
      { type: "p", text: "Bu soruya yalnızca gözleme dayalı yanıt vermek her zaman yeterli olmayabilir. Çünkü bazı gelişimsel gecikmeler, dikkat güçlükleri, okul olgunluğu sorunları ya da öğrenmeye hazırlıkla ilgili ihtiyaçlar ilk dönemde çok belirgin olmayabilir. Bu noktada <b>çocuk gelişim değerlendirme testleri</b>, çocuğun güçlü yönlerini ve desteklenmesi gereken alanlarını bilimsel bir çerçevede anlamamıza yardımcı olur." },
      { type: "p", text: "Gelişimsel değerlendirme testleri bir sınav değildir. Çocuk bu testlerden “geçmez” ya da “kalmaz”. Bu değerlendirmeler, çocuğun gelişim yolculuğunda nerede olduğunu anlamak ve ona en uygun desteği sunabilmek için kullanılan rehber araçlardır." },
      { type: "h2", text: "Gelişimsel Değerlendirme Neden Önemlidir?" },
      { type: "p", text: "Çocuk gelişiminde erken fark etmek oldukça değerlidir. Çünkü erken dönemde belirlenen gelişimsel ihtiyaçlar, doğru destekle daha etkili biçimde ele alınabilir." },
      { type: "p", text: "Gelişimsel değerlendirme sayesinde çocuğun güçlü yönleri, desteklenmesi gereken becerileri, yaşına uygun gelişimsel düzeyi ve günlük yaşam içindeki ihtiyaçları daha net anlaşılır. Böylece aileye, çocuğun gelişimini destekleyebilecek bilimsel, anlaşılır ve uygulanabilir bir yol haritası sunulabilir." },
      { type: "p", text: "Bu süreçte amaç çocuğu etiketlemek değil; onun gelişimini daha yakından tanımak, ihtiyaçlarını fark etmek ve potansiyelini desteklemektir." },
      { type: "h2", text: "DENVER II Gelişimsel Tarama Testi" },
      { type: "h3", text: "Gelişimin Genel Fotoğrafı" },
      { type: "p", text: "<b>DENVER II Gelişimsel Tarama Testi</b>, 0–6 yaş arasındaki çocukların gelişimsel düzeyini değerlendirmek amacıyla kullanılan gelişimsel tarama araçlarından biridir. Çocuğun gelişimi dört temel alanda incelenir: kişisel-sosyal gelişim, ince motor beceriler, dil gelişimi ve kaba motor beceriler." },
      { type: "p", text: "Bu değerlendirme, çocuğun yaşıtlarına göre gelişimsel olarak nasıl ilerlediğini anlamaya yardımcı olur. Özellikle konuşma, hareket, sosyal iletişim, günlük yaşam becerileri ve küçük kas gelişimi gibi alanlarda destek ihtiyacı olup olmadığını erken dönemde fark etmek açısından önemlidir." },
      { type: "p", text: "DENVER II, belirtiler okul hayatında ya da günlük yaşamda daha belirgin bir güçlük haline gelmeden önce çocuğun gelişimini destekleme fırsatı sunar." },
      { type: "h2", text: "AGTE – Ankara Gelişim Tarama Envanteri" },
      { type: "h3", text: "Bütüncül Bir Gelişim Değerlendirmesi" },
      { type: "p", text: "<b>AGTE</b>, yani <b>Ankara Gelişim Tarama Envanteri</b>, 0–6 yaş çocukların gelişimsel durumunu daha ayrıntılı biçimde değerlendirmek için kullanılan kapsamlı bir araçtır." },
      { type: "p", text: "Bu envanterde çocuğun dil-bilişsel gelişimi, ince motor becerileri, kaba motor becerileri, sosyal becerileri ve özbakım alanları ele alınır. Böylece çocuğun yalnızca belirli bir becerisi değil, günlük yaşam içindeki genel gelişimsel işlevselliği değerlendirilmiş olur." },
      { type: "p", text: "AGTE’nin güçlü yönlerinden biri, çocuğun çevresiyle kurduğu ilişkiyi, günlük yaşam becerilerini ve gelişimsel ihtiyaçlarını bütüncül biçimde anlamaya yardımcı olmasıdır. Bu nedenle aileye ve uzmana çocuğun desteklenmesi gereken alanları konusunda önemli bilgiler sunar." },
      { type: "h2", text: "Marmara İlkokula Hazır Oluş Ölçeği" },
      { type: "h3", text: "Okula Başlamaya Gerçekten Hazır mıyız?" },
      { type: "p", text: "İlkokula başlamak yalnızca belirli bir yaşı ya da ayı doldurmak anlamına gelmez. Bir çocuğun okula hazır oluşu; bilişsel, sosyal-duygusal, dilsel, motor ve öz düzenleme becerileriyle birlikte değerlendirilmelidir." },
      { type: "p", text: "<b>Marmara İlkokula Hazır Oluş Ölçeği</b>, çocuğun ilkokula başlamadan önce gerekli temel becerilere ne ölçüde sahip olduğunu anlamaya yardımcı olur. Bu değerlendirme, özellikle okul öncesi dönemden ilkokula geçiş sürecinde oldukça önemlidir." },
      { type: "p", text: "Okula hazır oluş değerlendirmesinde çocuğun yönerge takip etme, dikkatini sürdürme, temel kavramları anlama, kendini ifade etme, kalem kullanma, sınıf kurallarına uyum sağlama, sıra bekleme ve akran ilişkileri gibi becerileri ele alınır." },
      { type: "p", text: "Bu tür değerlendirmeler, okul kaygısı, uyum güçlüğü, erken akademik zorlanmalar ya da okul başarısızlığı riskini azaltmak için önemli ipuçları sunabilir. Amaç çocuğu “hazır” ya da “hazır değil” şeklinde etiketlemek değil; okula geçiş sürecinde hangi becerilerin desteklenmesi gerektiğini belirlemektir." },
      { type: "h2", text: "Portage Erken Eğitim Programı ve Değerlendirmesi" },
      { type: "h3", text: "Gelişimde Ev Temelli Destek" },
      { type: "p", text: "<b>Portage Erken Eğitim Programı</b>, yalnızca bir değerlendirme aracı değil, aynı zamanda çocuğun gelişimini desteklemeye yönelik yapılandırılmış bir erken eğitim yaklaşımıdır." },
      { type: "p", text: "Portage uygulamasında çocuğun mevcut gelişimsel becerileri değerlendirilir ve desteklenmesi gereken alanlara yönelik hedefler belirlenir. Bu hedefler çocuğun günlük yaşamı içinde, ev ortamında ve aile katılımıyla desteklenebilir." },
      { type: "p", text: "Program; bilişsel gelişim, dil gelişimi, motor gelişim, sosyal-duygusal gelişim ve özbakım becerileri gibi alanlara odaklanır. Portage’ın en önemli yönlerinden biri, ebeveyni sürecin aktif ve güvenli bir parçası haline getirmesidir." },
      { type: "p", text: "Burada ebeveynin rolü çocuğa baskı kurmak ya da öğretmen gibi davranmak değildir. Aksine ebeveyn, çocuğun doğal yaşamı içinde gelişimini destekleyen duyarlı ve rehber bir konumda yer alır." },
      { type: "h2", text: "MOXO Dikkat Testi" },
      { type: "h3", text: "Dikkat, Dürtüsellik ve Zamanlama Becerilerini Anlamak" },
      { type: "p", text: "<b>MOXO Dikkat Testi</b>, çocuklarda dikkat süreçlerini değerlendirmeye yardımcı olan bilgisayar tabanlı bir performans testidir. Özellikle dikkat eksikliği, dürtüsellik, hiperaktivite ve zamanlama becerileriyle ilgili önemli ipuçları sunabilir." },
      { type: "p", text: "Bu değerlendirmede çocuğun hedef uyaranlara odaklanma, doğru zamanda tepki verme, aceleci tepkileri kontrol etme ve dikkatini sürdürebilme becerileri incelenir." },
      { type: "p", text: "MOXO testi tek başına tanı koymak için kullanılmaz. Ancak uzman gözlemi, aile görüşmesi, öğretmen geri bildirimi ve diğer gelişimsel değerlendirmelerle birlikte ele alındığında çocuğun dikkat performansına ilişkin destekleyici bilgiler sağlayabilir." },
      { type: "p", text: "Özellikle dikkatini sürdürmekte zorlanan, yönerge takip etmekte güçlük yaşayan, görevleri tamamlamakta zorlanan ya da okul sürecinde dikkatle ilgili zorlanmalar gösteren çocuklarda değerlendirme sürecine katkı sunabilir." },
      { type: "h2", text: "PREP ve COGENT Eğitimleri" },
      { type: "h3", text: "Öğrenme Süreçlerini Destekleyen Bilişsel Programlar" },
      { type: "p", text: "Bazı çocuklar gelişimsel olarak temel becerilere sahip olsa da dikkat, planlama, işlemleme, problem çözme, görsel algı ya da öğrenme stratejileri geliştirme alanlarında desteğe ihtiyaç duyabilir." },
      { type: "p", text: "<b>PREP</b> ve <b>COGENT</b> gibi bilişsel temelli programlar, çocuğun yalnızca ne bildiğine değil, bilgiyi nasıl işlediğine, nasıl öğrendiğine ve karşılaştığı problemler karşısında nasıl strateji geliştirdiğine odaklanır." },
      { type: "p", text: "Bu programlar dikkat, odaklanma, planlama, organize olma, görsel-uzamsal algı, bellek, işlemleme ve problem çözme gibi becerilerin desteklenmesine yardımcı olabilir." },
      { type: "p", text: "Ancak her çocuk için aynı program uygun olmayabilir. Bu nedenle önce çocuğun ihtiyaçları ayrıntılı biçimde değerlendirilir, ardından bireyselleştirilmiş bir destek planı oluşturulur." },
      { type: "h2", text: "Ne Zaman Bir Uzmana Başvurmalısınız?" },
      { type: "p", text: "Her çocuk aynı hızda gelişmez. Ancak bazı durumlarda bir çocuk gelişimi uzmanından destek almak önemlidir." },
      { type: "p", text: "Çocuğunuz yaşıtlarına göre konuşmada belirgin gecikme yaşıyorsa, göz teması kurmakta zorlanıyorsa, ismine tutarlı biçimde tepki vermiyorsa, basit yönergeleri takip etmekte güçlük çekiyorsa ya da oyun becerileri yaşına göre sınırlı görünüyorsa gelişimsel değerlendirme planlanabilir." },
      { type: "p", text: "Ayrıca akran ilişkilerinde zorlanma, dikkatini sürdürmede güçlük, aşırı hareketlilik, dürtüsel davranışlar, okula başlama sürecinde kaygı ya da özbakım becerilerinde belirgin gecikme gibi durumlarda da uzman görüşü almak yararlı olabilir." },
      { type: "p", text: "Bilimsel temelli bir değerlendirme, çocuğunuzun hangi alanlarda desteklenmesi gerektiğini anlamak için güvenli ve yol gösterici bir adımdır." },
      { type: "h2", text: "Ebeveynler İçin Önemli Not: Bu Testler Bir Sınav Değildir" },
      { type: "highlight", text: "Çocuğunuz gelişimsel değerlendirmelerden geçmez ya da kalmaz. Bu testlerin amacı çocuğu yargılamak, kıyaslamak ya da etiketlemek değildir.<br><br>Değerlendirme sonuçları bize çocuğun güçlü yönlerini, desteklenmesi gereken becerilerini, gelişimsel ihtiyaçlarını ve evde nasıl bir yol izlenebileceğini gösterir.<br><br>Her çocuk kendine özgüdür. Bu nedenle değerlendirme süreci de çocuğun bireysel özelliklerine, yaşına, gelişimsel ihtiyaçlarına ve aile yapısına uygun şekilde planlanmalıdır." },
      { type: "h2", text: "Sonuç: Doğru Değerlendirme, Doğru Destek Demektir" },
      { type: "p", text: "Çocuk gelişimi bir yarış değil, her çocuğun kendi ritmi içinde ilerlediği özel bir yolculuktur. Bu yolculukta bazı işaretleri zamanında fark etmek, çocuğun ihtiyaçlarına daha erken ve daha doğru yanıt verilmesini sağlar." },
      { type: "p", text: "<b>DENVER II, AGTE, Marmara İlkokula Hazır Oluş Ölçeği, Portage Erken Eğitim Programı, MOXO Dikkat Testi, PREP ve COGENT gibi değerlendirme ve destek araçları</b>, çocuğun gelişimini daha bütüncül biçimde anlamaya yardımcı olur." },
      { type: "highlight", text: "Unutmayın: Erken değerlendirme çocuğunuzu etiketlemek değil; onun gelişimsel ihtiyaçlarını fark etmek, güçlü yönlerini desteklemek ve potansiyelini ortaya çıkarmak için atılan bilimsel ve duyarlı bir adımdır." },
      { type: "cta", text: "Çocuğunuzun gelişimsel ihtiyaçlarını birlikte değerlendirmek için iletişim formunu doldurabilirsiniz." }
    ]
  }
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
    <button class="blog-card" type="button" data-post-id="${post.id}" aria-label="${post.title} yazısını aç">
      <img src="${post.image}" alt="${post.alt}" loading="lazy">
      <div class="blog-card-body">
        <span>${post.category}</span>
        <h3>${post.title}</h3>
        <p>${post.summary}</p>
      </div>
    </button>
  `).join("");

  blogGrid.querySelectorAll("[data-post-id]").forEach((card) => {
    card.addEventListener("click", () => showBlogPost(card.dataset.postId));
  });
};

syncHeader();
renderBlogCards();
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
