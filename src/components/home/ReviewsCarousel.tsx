"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { RiStarFill } from "react-icons/ri";

interface Review {
  name: string;
  rating: number;
  text: string;
  date?: string;
  avatar?: any;
}

const HARDCODED_REVIEWS: Review[] = [
  {
    name: "Beyza Ö.",
    rating: 5,
    date: "Nisan 2026",
    text: "Mutlaka kendine değer veren her kadının gitmesi gerekiyor. Kuaförden Mutlu ayrılmak istiyorsanız kesinlikle yaşar beyle tanışmalısınız gönül rahatlığıyla öneriyorum. İçerideki herkesin enerjisi ilgisi alakası şahane🤌🏼🫶🏼"
  },
  {
    name: "Dicle K.",
    rating: 5,
    date: "Mart 2026",
    text: "Yıllardır gönül rahatlığıyla tercih ettiğim tek yer. Renk ve kesim yine tam istediğim gibi oldu. Hem profesyonellik hem ilgi her zaman mükemmel. İyi ki sizi seçmişim 👏✨"
  },
  {
    name: "Melissa K.",
    rating: 5,
    date: "Mart 2026",
    text: "Bugün kuaför ziyaretimden gerçekten çok memnun kaldım. Saç kesiminde çok özenli ve dikkatliydi, işini titizlikle yaptı. İsteklerimi dikkate aldı ve tam istediğim gibi bir sonuç ortaya çıktı. Genel olarak hizmet kalitesi gerçekten üst düzeydi. Gönül rahatlığıyla tavsiye ederim"
  },
  {
    name: "Neslihan A.",
    rating: 5,
    date: "Mart 2026",
    text: "Saçımı kestiren biri olarak gerçekten çok memnun kaldım. Ne istediğimi dikkatle dinledi ve tam hayal ettiğim gibi bir kesim yaptı. El emeği, özeni ve yaklaşımı için teşekkür ederim. Gönül rahatlığıyla tavsiye ederim."
  },
  {
    name: "Esra D.",
    rating: 5,
    date: "Mart 2026",
    text: "Yaşar bey her şeyden önce harika bir beyefendi. İşine olan saygısı ve özeni taktire şayan. Saç kesimi ve bakımı için tek adresim artık burası. Gönül rahatlığıyla gidebilirsiniz."
  },
  {
    name: "Aşkın B.",
    rating: 5,
    date: "Mart 2026",
    text: "Bugün tarafıma sunulan saç kesimi, kaş, bıyık, manikür, pedikür hizmetinizden çok memnun kaldım. Güler yüzünüz, ilginiz ve profesyonel yaklaşımınız için çok teşekkür ederim. 🌸"
  },
  {
    name: "Fırat A.",
    rating: 5,
    date: "Mart 2026",
    text: "Yıllar boyunca çeşitli kuaförleri dolaştım ilk defa bir kuaförden bu kadar memnun kaldım. Yaşar Bey’in ustalığı ve ilgisi gerçekten harika. Saçımı tam istediğim gibi kesti ve bakım yaptı. Hem işçilik hem de samimiyet mükemmel. Kesinlikle tavsiye ederim!"
  },
  {
    name: "Hülya Ş.",
    rating: 5,
    date: "Şubat 2026",
    text: "Yasar bey isinde cok basarili ve cok beyfendi birisi. Salonu tertemiz ve nezih bir ortam. Sac kesimi ve bakimi icin kesinlikle tavsiye ediyorum."
  },
  {
    name: "Yasemin Ç.",
    rating: 5,
    date: "Ocak 2026",
    text: "Yaşar bey her zamanki gibi harikalar yarattı. Saç kesimi ve boya konusunda üzerine tanımam. İlgi ve alakası için çok teşekkürler."
  },
  {
    name: "Fatma T.",
    rating: 5,
    date: "Aralık 2025",
    text: "Kızımla birlikte ilk kez gittiğimiz SKy kuaför Yaşar beyden çok memnun kaldık emeğinize güler yüzünüze ilginize çok teşekkür ederiz 💫"
  },
  {
    name: "Kerime G.",
    rating: 5,
    date: "Aralık 2025",
    text: "Çok güzel bir kuaför salonu olmuş Yaşar beyi tanıdığım için çok memnun oldum kendisin ilgisi nezaketi güler yüzlü harika bir ekibi var kesinlikle beş yıldızı hak ediyor 👏"
  },
  {
    name: "Melike K.",
    rating: 5,
    date: "Kasım 2025",
    text: "İşletme sahibi Yaşar Bey çok ilgili ve nazik. Saç kesimi ve boya konusunda çok başarılı. Kendinizi güvenle emanet edebilirsiniz."
  },
  {
    name: "Mine B.",
    rating: 5,
    date: "Mayıs 2025",
    text: "Yaşar Bey işini gerçekten çok iyi yapıyor. Herkese tavsiye ederim."
  },
  {
    name: "Nazlıcan Ş.",
    rating: 5,
    date: "Mayıs 2025",
    text: "Harika bir kuaför. İlgi ve alaka çok güzel."
  },
  {
    name: "Sevde İ.",
    rating: 5,
    date: "Mayıs 2025",
    text: "Saç kesimi ve boya konusunda çok başarılılar. Teşekkürler."
  }
];

// Slight rotations for organic feel
const ROTATIONS = [0.8, -1.2, 0.5, -0.7, 1.0, -0.4];

interface Props {
  reviews?: Review[];
  sectionTitle?: string;
}

export function ReviewsCarousel({ reviews, sectionTitle }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Combine sanity reviews with hardcoded ones
  const displayReviews = [...(reviews || []), ...HARDCODED_REVIEWS];

  return (
    <section id="yorumlar" className="bg-background py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-10 mb-12">
        <FadeIn direction="up">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-secondary">
              Müşteri Yorumları
            </p>
            <div className="flex items-center gap-1.5 bg-secondary/5 border border-secondary/20 px-2 py-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <RiStarFill key={i} size={10} className="text-secondary" />
                ))}
              </div>
              <span className="font-sans text-[10px] font-bold text-foreground tracking-wider">
                4.9
              </span>
              <span className="font-sans text-[10px] text-muted-foreground/60">
                (216+ Yorum)
              </span>
            </div>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground leading-tight">
            {sectionTitle ?? "Ne Dediler"}
          </h2>
        </FadeIn>
      </div>

      {/* Draggable Carousel */}
      <FadeIn direction="none" delay={0.2}>
        <motion.div
          ref={containerRef}
          className="flex gap-5 px-6 lg:px-10 cursor-grab active:cursor-grabbing select-none"
          drag="x"
          dragConstraints={{ right: 0, left: -((displayReviews.length - 1) * 380) }}
          dragElastic={0.1}
          whileDrag={{ cursor: "grabbing" }}
        >
          {displayReviews.map((review, i) => (
            <motion.div
              key={i}
              style={{ rotate: ROTATIONS[i % ROTATIONS.length] }}
              className="shrink-0 w-[320px] md:w-[360px] bg-card border border-border p-8 shadow-sm flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <RiStarFill
                    key={s}
                    size={12}
                    className={s < review.rating ? "text-secondary" : "text-border"}
                  />
                ))}
              </div>

              {/* Opening quote */}
              <p className="font-serif text-6xl text-secondary/20 leading-none mb-2 select-none">&ldquo;</p>

              {/* Review text */}
              <p className="font-sans text-sm text-foreground/75 leading-relaxed mb-6 line-clamp-4">
                {review.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-border mt-auto">
                <div className="w-8 h-8 bg-muted flex items-center justify-center shrink-0">
                  <span className="font-serif text-sm text-muted-foreground font-medium">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-sans text-xs font-medium text-foreground tracking-wide">
                    {review.name}
                  </p>
                  {review.date && (
                    <p className="font-sans text-[10px] text-muted-foreground mt-0.5">
                      {review.date}
                    </p>
                  )}
                </div>
                <div className="ml-auto">
                  <span className="font-sans text-[9px] tracking-widest uppercase text-secondary border border-secondary/30 px-2 py-0.5">
                    Google
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </FadeIn>

      {/* Drag hint */}
      <div className="container mx-auto px-6 lg:px-10 mt-8">
        <p className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground/50">
          ← Sürükleyerek kaydırın
        </p>
      </div>
    </section>
  );
}

