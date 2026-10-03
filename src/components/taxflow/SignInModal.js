"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { SIGN_IN_EMBED_HTML } from "@/components/taxflow/signInEmbed";

/* Sign-in pop-up. It shows the app's own sign-in embed (raw HTML, posted straight
   to the TaxFlowAI app with target="_top"), so the form itself is never rewritten.
   The embed uses fixed element ids, so it must only exist once on a page: on
   /taxflow/sign-in the button leaves the modal shut and the page's own form is used.

   Failed sign-ins: the form is a plain cross-site POST, so the app decides where
   the browser lands. When the app sends a failure back to
   /taxflow/sign-in?signin_error=<code>&portal=<client|accountant>, this provider
   returns the visitor to the page they were on and reopens the pop-up with the
   message, so the error stays in the overlay. Codes match the app's own list. */
export const SIGN_IN_PATH = "/taxflow/sign-in";
const RETURN_KEY = "tfai-signin-return";

const SIGN_IN_ERRORS = {
  missing: "Enter your email and password.",
  invalid: "Invalid email or password",
  locked: "Account temporarily locked. Try again later.",
  pending: "Complete your account setup using the link sent to your email before signing in.",
  inactive: "Account is inactive. Contact an administrator.",
  use_accountant: "These credentials are not valid for the Client Portal. Please use the Accountant Portal.",
  use_client: "These credentials are not valid for the Accountant Portal. Please use the Client Portal.",
  rate: "Too many login attempts, please try again later",
  server: "Something went wrong. Please try again.",
};

/* Show an error and preselect the portal on a rendered embed. This adds to the
   live DOM only; the embed source stays untouched. */
function applyNotice(root, notice) {
  const form = root?.querySelector("form.tfai-card");
  if (!form || !notice) return;
  if (notice.portal === "accountant") {
    const acc = form.querySelector("#tfai-p-acc");
    if (acc) acc.checked = true;
  }
  if (notice.message && !form.querySelector(".tc-si-error")) {
    const el = document.createElement("p");
    el.className = "tc-si-error";
    el.setAttribute("role", "alert");
    el.textContent = notice.message;
    form.querySelector(".tfai-switch")?.insertAdjacentElement("afterend", el);
  }
}

const SignInContext = createContext(null);

export function SignInProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState(null);
  const returnFocus = useRef(null);
  const router = useRouter();

  const openSignIn = useCallback(() => {
    returnFocus.current = document.activeElement;
    setNotice(null);
    setOpen(true);
  }, []);

  const closeSignIn = useCallback(() => {
    setOpen(false);
    setNotice(null);
    const el = returnFocus.current;
    if (el && typeof el.focus === "function") el.focus();
  }, []);

  /* a failed sign-in coming back from the app */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("signin_error");
    if (!code) return;
    const next = {
      message: SIGN_IN_ERRORS[code] || SIGN_IN_ERRORS.server,
      portal: params.get("portal") === "accountant" ? "accountant" : "client",
    };
    let back = null;
    try {
      back = window.sessionStorage.getItem(RETURN_KEY);
      window.sessionStorage.removeItem(RETURN_KEY);
    } catch {}
    /* only ever return to a page on this site */
    const fromModal = back && back.startsWith("/") && !back.startsWith("//") && !back.startsWith(SIGN_IN_PATH);
    const t = setTimeout(() => {
      if (fromModal) {
        router.replace(back);
        setNotice(next);
        setOpen(true);
      } else {
        window.history.replaceState(null, "", window.location.pathname);
        applyNotice(document.querySelector(".tfai-embed"), next);
      }
    }, 0);
    return () => clearTimeout(t);
  }, [router]);

  const value = useMemo(() => ({ openSignIn }), [openSignIn]);

  return (
    <SignInContext.Provider value={value}>
      {children}
      {open && <SignInModal onClose={closeSignIn} notice={notice} />}
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

function SignInModal({ onClose, notice }) {
  const bodyRef = useRef(null);

  /* esc to close, lock page scroll, start in the email field, and remember the
     page so a failed sign-in can come back to this overlay */
  useEffect(() => {
    const body = bodyRef.current;
    applyNotice(body, notice);
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    const onSubmit = () => {
      try {
        window.sessionStorage.setItem(RETURN_KEY, window.location.pathname + window.location.hash);
      } catch {}
    };
    document.addEventListener("keydown", onKey);
    body?.addEventListener("submit", onSubmit);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    body?.querySelector("#tfai-email")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      body?.removeEventListener("submit", onSubmit);
      document.body.style.overflow = prev;
    };
  }, [onClose, notice]);

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
