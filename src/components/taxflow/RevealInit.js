"use client";

import { useEffect } from "react";

/* Attaches scroll-reveal behaviour to .tc-reveal / .tc-observe elements.
   IntersectionObserver with a passive scroll fallback; reduced-motion is
   handled in CSS (elements render visible with no transition). */
export default function RevealInit() {
  useEffect(() => {
    const pending = new Set(document.querySelectorAll(".tc-reveal, .tc-observe"));
    const reveal = (el) => {
      el.classList.add("tc-visible");
      pending.delete(el);
      obs.unobserve(el);
    };
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) reveal(e.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    pending.forEach((el) => obs.observe(el));
    const checkNow = () => {
      const vh = window.innerHeight;
      pending.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh - 40 && r.bottom > 0) reveal(el);
      });
      if (!pending.size) window.removeEventListener("scroll", checkNow);
    };
    checkNow();
    window.addEventListener("scroll", checkNow, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", checkNow);
    };
  }, []);
  return null;
}
