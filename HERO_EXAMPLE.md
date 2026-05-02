"use client"

import { ChevronDown } from "lucide-react"

export function Hero() {
return (
<section className="relative h-screen w-full overflow-hidden">
{/_ Background Image with Zoom Effect _/}
<div className="absolute inset-0 overflow-hidden">
<div
className="hero-zoom absolute inset-0 bg-cover bg-center"
style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2874&auto=format&fit=crop')`,
          }}
/>
{/_ Overlay _/}
<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
</div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-3xl">
          {/* Subtitle */}
          <p className="text-secondary font-medium tracking-[0.3em] text-sm mb-6 uppercase">
            Kadın & Erkek Kuaförü
          </p>

          {/* Main Title */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium leading-tight mb-8">
            Tarzınızı
            <br />
            <span className="text-secondary">Yansıtın</span>
          </h1>

          {/* Description - kısa ve öz */}
          <p className="text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
            Profesyonel ekibimizle size özel bakım deneyimi
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#hizmetler"
              className="inline-flex items-center justify-center bg-secondary text-secondary-foreground px-8 py-4 text-sm font-medium tracking-wide hover:bg-secondary/90 transition-all"
            >
              Hizmetlerimiz
            </a>
            <a
              href="#iletisim"
              className="inline-flex items-center justify-center border border-white/30 text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-white/10 transition-all"
            >
              İletişim
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a
          href="#hakkimizda"
          className="flex flex-col items-center text-white/60 hover:text-white transition-colors"
        >
          <span className="text-xs tracking-widest uppercase mb-2">Keşfet</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>

)
}
