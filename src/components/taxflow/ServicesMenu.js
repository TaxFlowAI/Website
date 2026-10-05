"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CreditDisclosures from "@/components/taxflow/CreditDisclosures";
import { SERVICES_MENU, serviceForPath } from "@/components/taxflow/servicesNav";

/* The header's Services menu. Desktop: hovering (or clicking) Services drops a
   panel listing each service; hovering or focusing a service opens the
   services within it beside the list. Phones: an accordion in the drawer.
   Content lives in servicesNav.js; styles are .tc-mm-* and .tc-msvc-* in
   the-current.css.
   Keyboard: Enter/Space or ArrowDown opens, ArrowUp/ArrowDown move between
   services, ArrowRight enters a service's list, ArrowLeft returns, Escape
   closes (from anywhere on the page). Tab order runs each service and then
   its own links. */

const OPEN_DELAY = 80; // hover intent before the panel opens
const CLOSE_DELAY = 200; // grace period for crossing the gap to the panel
const SWITCH_DELAY = 90; // so a diagonal move across rows doesn't flick panes

const ALL_SERVICES_HREF = "/taxflow#services";

const ICONS = {
  platform: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
      <path d="M9.5 10.5l1.8 1.8 3.2-3.6" />
    </>
  ),
  tax: (
    <>
      <path d="M6.5 3h7.5l4 4v14h-11.5z" />
      <path d="M14 3v4h4" />
      <path d="M9.5 14l1.8 1.8 3.2-3.6" />
    </>
  ),
  corporate: (
    <>
      <path d="M3.5 20.5h17" />
      <path d="M12 3.5l8 5h-16z" />
      <path d="M6 11v7M10 11v7M14 11v7M18 11v7" />
    </>
  ),
  frontline: (
    <>
      <path d="M3.5 11L12 4l8.5 7" />
      <path d="M5.5 9.5v11h13v-11" />
      <path d="M10 20.5v-5.5h4v5.5" />
    </>
  ),
};

function Icon({ id }) {
  return (
    <span className="tc-mm-icon" aria-hidden>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {ICONS[id]}
      </svg>
    </span>
  );
}

function Chevron({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

/* Frontline Financial: its two businesses, the loan app link and the credit
   disclosures that must show wherever loans are mentioned. Shared by both menus. */
function FrontlineDetail({ service, onNavigate, linkClass, groupClass }) {
  return (
    <>
      <div className={groupClass}>
        {service.groups.map((g) => (
          <div key={g.href}>
            <Link href={g.href} className="tc-mm-group-title" onClick={onNavigate}>
              {g.label}
            </Link>
            <ul className="tc-mm-names">
              {g.services.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Link href={service.app.href} className={linkClass} onClick={onNavigate}>
        <b>{service.app.label}</b>
        <span>{service.app.line}</span>
      </Link>
      <CreditDisclosures className="tc-mm-legal" />
    </>
  );
}

export default function ServicesMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => serviceForPath(pathname));
  const [lastPath, setLastPath] = useState(pathname);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const timers = useRef({});
  const pointer = useRef("mouse");
  const hoverOpened = useRef(false);
  const wasActive = useRef(false);
  const penHovers = useRef(false);

  /* a navigation (back/forward, or a link outside the menu) closes it */
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const clear = (key) => clearTimeout(timers.current[key]);
  const later = (key, fn, ms) => {
    clear(key);
    timers.current[key] = setTimeout(fn, ms);
  };

  const show = (byHover) => {
    ["open", "close"].forEach(clear);
    if (!open) {
      setActive(serviceForPath(pathname));
      hoverOpened.current = byHover;
    }
    setOpen(true);
  };

  const close = (returnFocus) => {
    ["open", "close", "switch"].forEach(clear);
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  };

  /* While open: a press anywhere outside closes it, and so does Escape from
     anywhere on the page (a hover-opened panel must be dismissible without
     moving focus). Focus returns to the button only if it was in the menu. */
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      const inside = rootRef.current?.contains(document.activeElement);
      Object.values(timers.current).forEach(clearTimeout);
      setOpen(false);
      if (inside) buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const t = timers.current;
    return () => Object.values(t).forEach(clearTimeout);
  }, []);

  const rows = () => [...(rootRef.current?.querySelectorAll("[data-mm-row]") ?? [])];
  const paneLinks = (id) => [...(rootRef.current?.querySelectorAll(`#tc-mm-pane-${id} a`) ?? [])];
  const focusRow = (id) => rootRef.current?.querySelector(`[data-mm-row="${id}"]`)?.focus();
  /* a keyboard user is somewhere inside the panel */
  const keyboardFocusInside = () => {
    const el = document.activeElement;
    return Boolean(el && el !== buttonRef.current && rootRef.current?.contains(el) && el.matches(":focus-visible"));
  };
  /* the panel becomes visible on the next frame, so focus after it */
  const afterPaint = (fn) => requestAnimationFrame(() => requestAnimationFrame(fn));

  const onKeyDown = (e) => {
    const t = e.target;
    if (t === buttonRef.current && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      e.preventDefault();
      const target = open ? active : serviceForPath(pathname);
      show(false);
      afterPaint(() => focusRow(target));
      return;
    }
    const row = t.closest?.("[data-mm-row]");
    if (row) {
      const list = rows();
      const i = list.indexOf(row);
      let next = null;
      if (e.key === "ArrowDown") next = list[(i + 1) % list.length];
      if (e.key === "ArrowUp") next = list[(i - 1 + list.length) % list.length];
      if (e.key === "Home") next = list[0];
      if (e.key === "End") next = list[list.length - 1];
      if (next) {
        e.preventDefault();
        next.focus();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        paneLinks(row.dataset.mmRow)[0]?.focus();
      }
      return;
    }
    const pane = t.closest?.(".tc-mm-pane");
    if (pane) {
      const id = pane.id.replace("tc-mm-pane-", "");
      const list = paneLinks(id);
      const i = list.indexOf(t);
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        focusRow(id);
      } else if (i > -1 && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        e.preventDefault();
        const step = e.key === "ArrowDown" ? 1 : -1;
        list[(i + step + list.length) % list.length]?.focus();
      }
    }
  };

  /* Tabbing out of the menu closes it. A click on plain text inside the panel
     blurs to nothing (relatedTarget null) and must not close it. */
  const onBlur = (e) => {
    if (open && e.relatedTarget && !rootRef.current?.contains(e.relatedTarget)) setOpen(false);
  };

  /* Mouse, or a pen that hovers (it enters with no buttons pressed). A pen that
     only registers on contact, like a tap, is treated as touch. */
  const isHoverPointer = (e) => {
    if (e.pointerType === "mouse") return true;
    if (e.pointerType !== "pen") return false;
    if (e.type === "pointerenter" && e.buttons === 0) penHovers.current = true;
    return penHovers.current;
  };
  const isTap = () => pointer.current === "touch" || (pointer.current === "pen" && !penHovers.current);
  const navigate = () => close(false);

  return (
    <div
      ref={rootRef}
      className="tc-mm-wrap"
      onPointerEnter={(e) => isHoverPointer(e) && clear("close")}
      onPointerLeave={(e) => {
        clear("open");
        /* a keyboard user's panel stays open when the mouse drifts off */
        if (isHoverPointer(e) && open && !keyboardFocusInside()) later("close", () => setOpen(false), CLOSE_DELAY);
      }}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    >
      <button
        ref={buttonRef}
        type="button"
        className="tc-mm-trigger"
        aria-expanded={open}
        aria-controls="tc-mm-panel"
        onPointerDown={(e) => {
          pointer.current = e.pointerType;
        }}
        onPointerEnter={(e) => {
          if (isHoverPointer(e) && !open) later("open", () => show(true), OPEN_DELAY);
        }}
        onClick={(e) => {
          /* a mouse click on a menu that hover already opened keeps it open */
          if (open && hoverOpened.current && e.detail > 0 && !isTap()) {
            hoverOpened.current = false;
            return;
          }
          if (open) close(false);
          else show(false);
        }}
      >
        <span className="tc-nav-link">Services</span>
        <Chevron className="tc-mm-caret" />
      </button>

      <div
        id="tc-mm-panel"
        className={`tc-mm ${open ? "is-open" : ""}`}
        style={{ gridTemplateRows: `repeat(${SERVICES_MENU.length}, auto) 1fr` }}
        onPointerEnter={(e) => isHoverPointer(e) && clear("close")}
      >
        {SERVICES_MENU.map((s, i) => {
          const isActive = s.id === active;
          return (
            <Fragment key={s.id}>
              <Link
                href={s.href}
                data-mm-row={s.id}
                className={`tc-mm-row ${isActive ? "is-active" : ""} ${i === 0 ? "is-first" : ""}`}
                style={{ gridRow: i + 1 }}
                aria-current={pathname === s.href ? "page" : undefined}
                onPointerDown={(e) => {
                  pointer.current = e.pointerType;
                  wasActive.current = isActive;
                }}
                onPointerEnter={(e) => {
                  /* moving keyboard focus with the pane, so focus is never left on a hidden link */
                  if (isHoverPointer(e)) {
                    later("switch", () => (keyboardFocusInside() ? focusRow(s.id) : setActive(s.id)), SWITCH_DELAY);
                  }
                }}
                onPointerLeave={() => clear("switch")}
                onFocus={() => {
                  clear("switch");
                  setActive(s.id);
                }}
                onClick={(e) => {
                  /* on touch, the first tap shows the service's list; the second opens its page */
                  if (isTap() && e.detail > 0 && !wasActive.current) {
                    e.preventDefault();
                    wasActive.current = true;
                    setActive(s.id);
                    return;
                  }
                  navigate();
                }}
              >
                <Icon id={s.id} />
                <span className="min-w-0">
                  <span className="tc-mm-row-eyebrow">{s.eyebrow}</span>
                  <span className="tc-mm-row-title">{s.label}</span>
                </span>
                <span className="tc-mm-row-go" aria-hidden>
                  <Arrow />
                </span>
              </Link>

              <div
                id={`tc-mm-pane-${s.id}`}
                role="group"
                aria-label={`${s.label} services`}
                className={`tc-mm-pane ${isActive ? "is-active" : ""}`}
              >
                <p className="tc-mm-kicker">{s.kicker}</p>
                <p className="tc-mm-lead">{s.lead}</p>
                {s.items && (
                  <ul className="tc-mm-items">
                    {s.items.map((it) => (
                      <li key={it.href + it.label}>
                        <Link
                          href={it.href}
                          className="tc-mm-item"
                          aria-current={pathname === it.href ? "page" : undefined}
                          onClick={navigate}
                        >
                          <b>{it.label}</b>
                          <span>{it.line}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {s.groups && (
                  <FrontlineDetail
                    service={s}
                    onNavigate={navigate}
                    linkClass="tc-mm-item tc-mm-app"
                    groupClass="tc-mm-groups"
                  />
                )}
                <div className="tc-mm-foot">
                  <Link href={s.href} className="tc-mm-overview" onClick={navigate}>
                    {s.overview}
                    <Arrow />
                  </Link>
                </div>
              </div>
            </Fragment>
          );
        })}
        <Link
          href={ALL_SERVICES_HREF}
          className="tc-mm-all"
          style={{ gridRow: SERVICES_MENU.length + 1 }}
          onClick={navigate}
        >
          All services
          <Arrow />
        </Link>
      </div>
    </div>
  );
}

/* Phones: Services expands in the drawer, and each service expands to its own
   list. `onNavigate` closes the drawer. */
export function MobileServicesMenu({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="tc-msvc">
      <button
        type="button"
        className="tc-msvc-btn"
        aria-expanded={open}
        aria-controls="tc-msvc-list"
        onClick={() => setOpen(!open)}
      >
        Services
        <Chevron className={`tc-msvc-caret ${open ? "is-open" : ""}`} />
      </button>
      <div id="tc-msvc-list" hidden={!open}>
        {SERVICES_MENU.map((s) => {
          const isOpen = expanded === s.id;
          const subId = `tc-msvc-${s.id}`;
          return (
            <div key={s.id}>
              <div className="tc-msvc-row">
                <Link href={s.href} onClick={onNavigate}>
                  {s.label}
                </Link>
                <button
                  type="button"
                  className="tc-msvc-toggle"
                  aria-expanded={isOpen}
                  aria-controls={subId}
                  aria-label={`${s.label} services`}
                  onClick={() => setExpanded(isOpen ? null : s.id)}
                >
                  <Chevron className={`tc-msvc-caret ${isOpen ? "is-open" : ""}`} />
                </button>
              </div>
              <div id={subId} className="tc-msvc-sub" hidden={!isOpen}>
                {s.items?.map((it) => (
                  <Link key={it.href + it.label} href={it.href} onClick={onNavigate}>
                    {it.label}
                  </Link>
                ))}
                {s.groups && (
                  <FrontlineDetail
                    service={s}
                    onNavigate={onNavigate}
                    linkClass="tc-msvc-app"
                    groupClass="tc-msvc-groups"
                  />
                )}
              </div>
            </div>
          );
        })}
        <Link href={ALL_SERVICES_HREF} className="tc-msvc-all" onClick={onNavigate}>
          All services
        </Link>
      </div>
    </div>
  );
}
