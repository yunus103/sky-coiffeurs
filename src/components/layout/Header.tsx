"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SanityImage } from "@/components/ui/SanityImage";
import { Button } from "@/components/ui/button";
import { RiMenu3Line, RiCloseLine, RiArrowDownSLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  openInNewTab?: boolean;
  subLinks?: NavItem[];
};

function resolveHref(item: NavItem): string {
  return item.href || "#";
}

export function Header({ settings, navigation }: { settings: any; navigation: any }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const links: NavItem[] = navigation?.headerLinks || [];
  const isHome = pathname === "/";

  // Split links for centered logo layout
  const mid = Math.ceil(links.length / 2);
  const leftLinks = links.slice(0, mid);
  const rightLinks = links.slice(mid);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (item: NavItem) => {
    const href = resolveHref(item);
    if (href === "/" && pathname !== "/") return false;
    return pathname.startsWith(href);
  };

  const transparent = mounted && isHome && !scrolled && !menuOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        transparent
          ? "bg-transparent border-transparent"
          : "bg-background/97 backdrop-blur-md border-b border-border"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-10">

        {/* Left Nav — Desktop */}
        <nav className="hidden lg:flex items-center gap-8 flex-1">
          {leftLinks.map((item, i) => (
            <DesktopNavItem key={i} item={item} active={isActive(item)} transparent={transparent} />
          ))}
        </nav>

        {/* Logo — Center */}
        <Link 
          href="/" 
          className="flex items-center justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2 mt-2 md:mt-3 mb-2 md:mb-3"
          style={{ transform: "rotate(2.2deg)" }}
          aria-label={settings?.siteName ? `${settings.siteName} Ana Sayfa` : "Ana Sayfa"}
        >
          <div className="relative flex items-center justify-center h-16 w-40 md:h-[70px] md:w-48">
            {settings?.logo ? (
              <SanityImage
                image={settings.logo}
                fill
                objectFit="contain"
                className={cn(
                  "transition-all duration-500",
                  transparent ? "brightness-0 invert" : ""
                )}
                priority
                noBlur
              />
            ) : (
              <span
                className={cn(
                  "font-serif text-xl font-medium tracking-tight transition-colors duration-500",
                  transparent ? "text-white" : "text-foreground"
                )}
              >
                {settings?.siteName ?? "Sky Coiffeurs"}
              </span>
            )}
          </div>
        </Link>

        {/* Right Nav + CTA — Desktop */}
        <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
          {rightLinks.map((item, i) => (
            <DesktopNavItem key={i} item={item} active={isActive(item)} transparent={transparent} />
          ))}
          <Link
            href="/iletisim"
            className={cn(
              "text-xs font-sans tracking-[0.2em] uppercase px-5 py-2.5 border transition-all duration-300",
              transparent
                ? "border-white/50 text-white hover:bg-white hover:text-foreground"
                : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            )}
          >
            Randevu Al
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-3 ml-auto">
          <Link
            href="/iletisim"
            className={cn(
              "text-[10px] font-sans tracking-[0.2em] uppercase px-3 py-2 border transition-all",
              transparent
                ? "border-white/50 text-white"
                : "border-primary text-primary"
            )}
          >
            Randevu Al
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menüyü aç/kapat"
            className={cn(transparent ? "text-white hover:bg-white/10" : "")}
          >
            {menuOpen ? <RiCloseLine size={22} /> : <RiMenu3Line size={22} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-background overflow-hidden lg:hidden"
          >
            <nav className="container mx-auto flex flex-col px-6 py-8 gap-1">
              {links.map((item, i) => (
                <div key={i} className="flex flex-col">
                  <Link
                    href={resolveHref(item)}
                    className={cn(
                      "font-sans text-sm py-3 border-b border-border/50 tracking-wide transition-colors hover:text-primary",
                      isActive(item) ? "text-primary" : "text-foreground/70"
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.subLinks && (
                    <div className="flex flex-col pl-4 mt-1 gap-0.5">
                      {item.subLinks.map((sub, j) => (
                        <Link
                          key={j}
                          href={resolveHref(sub)}
                          className="font-sans text-sm py-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function DesktopNavItem({
  item,
  active,
  transparent,
}: {
  item: NavItem;
  active: boolean;
  transparent: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isSubActive = item.subLinks?.some((sub) => pathname === resolveHref(sub));
  const reallyActive = active || isSubActive;

  const linkClass = cn(
    "font-sans text-xs tracking-[0.15em] uppercase transition-colors duration-300",
    transparent
      ? reallyActive ? "text-secondary" : "text-white/80 hover:text-white"
      : reallyActive ? "text-primary font-semibold" : "text-foreground/60 hover:text-primary"
  );

  if (!item.subLinks?.length) {
    return (
      <Link
        href={resolveHref(item)}
        target={item.openInNewTab ? "_blank" : undefined}
        rel={item.openInNewTab ? "noopener noreferrer" : undefined}
        className={linkClass}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link href={resolveHref(item)} className={cn(linkClass, "flex items-center gap-1")}>
        {item.label}
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <RiArrowDownSLine size={14} />
        </motion.span>
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full pt-4 min-w-[200px]"
          >
            <div className="bg-background border border-border shadow-lg p-2">
              {item.subLinks!.map((sub, j) => {
                const subActive = pathname === resolveHref(sub);
                return (
                  <Link
                    key={j}
                    href={resolveHref(sub)}
                    className={cn(
                      "block px-4 py-2.5 text-xs font-sans tracking-widest uppercase transition-colors hover:bg-muted",
                      subActive ? "text-primary" : "text-foreground/70"
                    )}
                  >
                    {sub.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
