"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { SIGN_IN_EMBED_HTML } from "@/components/taxflow/signInEmbed";

/* Sign-in pop-up. It shows the app's own sign-in embed (raw HTML, posted straight
   to the TaxFlowAI app with target="_top"), so the form itself is never rewritten.
   The embed uses fixed element ids, so it must only exist once on a page: on
   /taxflow/sign-in the button leaves the modal shut and the page's own form is used. */
export const SIGN_IN_PATH = "/taxflow/sign-in";

const SignInContext = createContext(null);

export function SignInProvider({ children }) {
  const [open, setOpen] = useState(false);
  const returnFocus = useRef(null);

  const openSignIn = useCallback(() => {
    returnFocus.current = document.activeElement;
    setOpen(true);
  }, []);

  const closeSignIn = useCallback(() => {
    setOpen(false);
    const el = returnFocus.current;
    if (el && typeof el.focus === "function") el.focus();
  }, []);

  const value = useMemo(() => ({ openSignIn }), [openSignIn]);

  return (
    <SignInContext.Provider value={value}>
      {children}
      {open && <SignInModal onClose={closeSignIn} />}
    </SignInContext.Provider>
  );
}

/* A real link to the sign-in page that opens the pop-up instead. Still works with
   JS off, without the provider, and with ctrl/cmd-click or middle-click. */
export function SignInButton({ children = "Sign in", className, onOpen, ...rest }) {
  const ctx = useContext(SignInContext);
  const pathname = usePathname();

  const onClick = (e) => {
    if (!ctx || pathname === SIGN_IN_PATH || e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    onOpen?.();
    ctx.openSignIn();
  };

  return (
    <a href={SIGN_IN_PATH} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}

function SignInModal({ onClose }) {
  const bodyRef = useRef(null);

  /* esc to close, lock page scroll, start in the email field */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    bodyRef.current?.querySelector("#tfai-email")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <div className="tc-bk-overlay tc-si-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="tc-si-wrap" role="dialog" aria-modal="true" aria-label="Sign in to TaxFlowAI">
        <button type="button" className="tc-bk-close tc-si-close" onClick={onClose} aria-label="Close sign in">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        </button>
        <div ref={bodyRef} dangerouslySetInnerHTML={{ __html: SIGN_IN_EMBED_HTML }} />
        <p className="tc-mono mt-5 text-center text-[10.5px] tracking-[0.14em]" style={{ color: "#94A3B8" }}>
          EVERY SIGN-IN IS CONFIRMED WITH A ONE-TIME CODE
        </p>
      </div>
    </div>,
    document.body
  );
}
