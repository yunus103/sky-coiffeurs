"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Next.js yönlendirmelerinin ardından sayfanın kesinlikle en tepeye scroll edilmesini sağlar.
    // "instant" kullanarak animasyonsuz bir sıçrama garantiler.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
