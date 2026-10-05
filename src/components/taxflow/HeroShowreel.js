"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import Image from "next/image";
import { SCREENS } from "@/components/taxflow/AppScreens";
import { SHOW_TAX_SERVICES } from "@/data/taxflow-flags";

/* Home hero: the phone swipes through real app screens while Flo dances
   between them, changing pose (and his line) for each screen.

   Screenshots and Flo renders are the owner's, shown unedited. Flo's lines
   are the approved feature-page asides: friendly, never a claim. Loan screens
   are left out on purpose (they need the credit disclosures).

   Runs once the intro (phone arrives, scan line, Flo lands; CSS in
   the-current.css) has played, and keeps going by itself: it only waits while
   off screen or in a background tab, and the pause button stops it. With
   reduced motion it never plays by itself and Flo does not dance. */

const SLIDES = [
  { id: "receipt-question", pose: "present", say: "Hello! I’m Flo." },
  { id: "receipt-filed", pose: "receipt", say: "Snap it. I’ll file it." },
  { id: "deductions-tiles", pose: "magnifier", say: "I’ll show you where it goes." },
  { id: "upload-choose-account", pose: "folder", say: "Filed and tidy." },
  { id: "job-tracker", pose: "clipboard", say: "Here’s your progress.", tax: true },
  { id: "flo-help", pose: "headset", say: "Ask me, or ask your accountant." },
  { id: "invoices-list", pose: "stamp", say: "Who owes you, at a glance." },
].filter((s) => SHOW_TAX_SERVICES || !s.tax);

const N = SLIDES.length;
const HOLD = 2800; // time on each screen
const SWIPE = 600; // phone swipe, matches .tc-reel-track transition
const SWIPE_AFTER = 120; // the phone moves just after Flo pushes off
const START = 1200; // first preload, after the intro

const PHONE_SIZES = "(min-width: 1024px) 232px, (min-width: 640px) 212px, 53vw";
const FLO_SIZES = "(min-width: 1024px) 236px, (min-width: 640px) 210px, 52vw";

/* Three dance moves, used in turn. `swap` is when, as a fraction of the move,
   Flo changes pose: at the top of the hop, edge-on in the twirl, mid-shimmy. */
const MOVES = [
  {
    duration: 950,
    swap: 0.42,
    easing: "cubic-bezier(0.33, 0, 0.2, 1)",
    frames: [
      { transform: "translateY(0) rotate(0deg) scale(1, 1)" },
      { transform: "translateY(5px) rotate(0deg) scale(1.06, 0.92)", offset: 0.16 },
      { transform: "translateY(-30px) rotate(-9deg) scale(0.97, 1.04)", offset: 0.42 },
      { transform: "translateY(-28px) rotate(7deg) scale(0.97, 1.04)", offset: 0.6 },
      { transform: "translateY(4px) rotate(0deg) scale(1.05, 0.94)", offset: 0.82 },
      { transform: "translateY(0) rotate(0deg) scale(1, 1)" },
    ],
  },
  {
    duration: 1000,
    swap: 0.3,
    easing: "linear",
    frames: [
      { transform: "perspective(700px) translateY(0) rotateY(0deg)", easing: "ease-in" },
      { transform: "perspective(700px) translateY(-14px) rotateY(90deg)", offset: 0.3 },
      { transform: "perspective(700px) translateY(-20px) rotateY(180deg)", offset: 0.5 },
      { transform: "perspective(700px) translateY(-14px) rotateY(270deg)", offset: 0.7, easing: "ease-out" },
      { transform: "perspective(700px) translateY(0) rotateY(360deg)" },
    ],
  },
  {
    duration: 1000,
    swap: 0.45,
    easing: "ease-in-out",
    frames: [
      { transform: "translate(0, 0) rotate(0deg)" },
      { transform: "translate(-6px, -8px) rotate(-10deg)", offset: 0.17 },
      { transform: "translate(6px, 0) rotate(10deg)", offset: 0.38 },
      { transform: "translate(-5px, -8px) rotate(-8deg)", offset: 0.58 },
      { transform: "translate(4px, 0) rotate(6deg)", offset: 0.78 },
      { transform: "translate(0, 0) rotate(0deg)" },
    ],
  },
];

function PlayIcon({ playing }) {
  return playing ? (
    <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden>
      <rect x="1.5" y="1" width="2.4" height="8" rx="0.6" fill="currentColor" />
      <rect x="6.1" y="1" width="2.4" height="8" rx="0.6" fill="currentColor" />
    </svg>
  ) : (
    <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden>
      <path d="M2.2 1.2v7.6a.5.5 0 0 0 .76.43l6.1-3.8a.5.5 0 0 0 0-.86L2.96.77a.5.5 0 0 0-.76.43z" fill="currentColor" />
    </svg>
  );
}

export default function HeroShowreel() {
  const [cur, setCur] = useState(0); // the screen being shown, 0..N-1
  const [track, setTrack] = useState(0); // track position, N = copy of the first screen
  const [snap, setSnap] = useState(false); // jump without a transition
  const [pose, setPose] = useState(0);
  const [say, setSay] = useState(0);
  const [bubbleOn, setBubbleOn] = useState(true);
  const [reach, setReach] = useState(0); // highest slide allowed to load
  const [armed, setArmed] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  const rootRef = useRef(null);
  const dancerRef = useRef(null);
  const danceRef = useRef(null);
  const timers = useRef([]);
  const moveRef = useRef(0);
  const loadedPoses = useRef(new Set([0]));
  const pendingPose = useRef(null);

  const later = (fn, ms) => {
    timers.current.push(setTimeout(fn, ms));
  };
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduced(mq.matches);
      if (mq.matches) setPlaying(false);
    };
    sync();
    mq.addEventListener("change", sync);

    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);

    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.2 });
    if (rootRef.current) io.observe(rootRef.current);

    const t = setTimeout(() => {
      setArmed(true);
      setReach(1);
    }, START);

    return () => {
      mq.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      clearTimeout(t);
      clearTimers();
      danceRef.current?.cancel();
    };
  }, []);

  // never swap to a pose that has not loaded: Flo keeps his current one and
  // changes as soon as the new one arrives
  const showPose = (i) => {
    if (loadedPoses.current.has(i)) {
      pendingPose.current = null;
      setPose(i);
    } else {
      pendingPose.current = i;
    }
  };
  const markPose = (i) => {
    loadedPoses.current.add(i);
    if (pendingPose.current === i) showPose(i);
  };

  const goTo = (next, { loop = false } = {}) => {
    const target = ((next % N) + N) % N;
    clearTimers();
    danceRef.current?.cancel();
    setReach((r) => Math.max(r, Math.min(target + 1, N - 1)));
    setCur(target);

    if (reduced) {
      showPose(target);
      setSay(target);
      setBubbleOn(true);
      setSnap(true);
      setTrack(target);
      return;
    }

    const move = MOVES[moveRef.current % MOVES.length];
    moveRef.current += 1;
    danceRef.current = dancerRef.current?.animate(move.frames, {
      duration: move.duration,
      easing: move.easing,
    });

    setBubbleOn(false);
    later(() => showPose(target), move.duration * move.swap);
    later(() => {
      setSay(target);
      setBubbleOn(true);
    }, move.duration * 0.72);

    later(() => {
      setSnap(false);
      setTrack(loop ? N : target);
    }, SWIPE_AFTER);

    // after swiping onto the copy of the first screen, jump back to the
    // real one without a transition so the loop never runs backwards
    if (loop) {
      later(() => {
        setSnap(true);
        setTrack(0);
      }, SWIPE_AFTER + SWIPE + 40);
    }
  };

  // someone reaching for the dots: load every screen and pose now
  const preloadAll = () => {
    setArmed(true);
    setReach(N - 1);
  };

  const paused = !playing || !onScreen || !tabVisible || reduced;

  const advance = useEffectEvent(() => goTo(cur + 1, { loop: cur === N - 1 }));

  useEffect(() => {
    if (!armed || paused) return;
    const t = setTimeout(advance, HOLD);
    return () => clearTimeout(t);
  }, [armed, paused, cur]);

  return (
    <div
      ref={rootRef}
      className="tc-reel-wrap"
      role="region"
      aria-roledescription="carousel"
      aria-label="A look inside the TaxFlowAI app"
    >
      <div className="tc-hero-demo">
        <div className="tc-hero-demo-phone">
          <span className="tc-dev">
            <span className="tc-dev-screen">
              <span className="tc-reel">
                <span
                  className={`tc-reel-track ${snap ? "is-snap" : ""}`}
                  style={{ transform: `translateX(-${track * 100}%)` }}
                >
                  {[...SLIDES, SLIDES[0]].map((s, i) => {
                    const real = i < N;
                    const shown = real && i === cur;
                    const loadable = i === 0 || i === N || (armed && i <= reach);
                    const sc = SCREENS[s.id];
                    return (
                      <span
                        key={real ? s.id : "loop"}
                        className="tc-reel-slide"
                        role={real ? "group" : undefined}
                        aria-roledescription={real ? "slide" : undefined}
                        aria-label={real ? `${i + 1} of ${N}` : undefined}
                        aria-hidden={!shown}
                      >
                        {loadable && (
                          <Image
                            src={`/images/taxflow/app/${s.id}.jpg`}
                            alt={real ? sc.alt : ""}
                            width={sc.w}
                            height={sc.h}
                            sizes={PHONE_SIZES}
                            quality={90}
                            priority={i === 0}
                            loading={i === 0 ? undefined : "eager"}
                          />
                        )}
                      </span>
                    );
                  })}
                </span>
              </span>
            </span>
          </span>
        </div>

        <div className="tc-flo-stage tc-hero-demo-flo">
          <div className="tc-flo-glow" aria-hidden />
          <div className="float-animate relative z-10">
            <div ref={dancerRef} className="tc-hero-dancer">
              {SLIDES.map((s, i) =>
                i === 0 || (armed && i <= reach) ? (
                  <Image
                    key={s.pose}
                    src={`/images/taxflow/flo/flo-${s.pose}.webp`}
                    alt={i === 0 ? "Flo, the TaxFlowAI assistant, waving hello beside the app" : ""}
                    aria-hidden={i !== 0}
                    width={1254}
                    height={1254}
                    sizes={FLO_SIZES}
                    priority={i === 0}
                    loading={i === 0 ? undefined : "eager"}
                    onLoad={() => markPose(i)}
                    className={`tc-hero-pose ${i === pose ? "is-on" : ""}`}
                  />
                ) : null
              )}
            </div>
          </div>
          <div className="tc-hero-bubble-wrap" aria-hidden>
            <p className={`tc-hero-bubble ${bubbleOn ? "" : "is-hidden"}`}>{SLIDES[say].say}</p>
          </div>
          <div className="tc-flo-shadow" aria-hidden />
        </div>
      </div>

      <div className="tc-reel-controls" onPointerEnter={preloadAll} onPointerDown={preloadAll} onFocus={preloadAll}>
        {!reduced && (
          <button
            type="button"
            className="tc-reel-play"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause the app preview" : "Play the app preview"}
          >
            <PlayIcon playing={playing} />
          </button>
        )}
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className="tc-reel-dot"
            onClick={() => i !== cur && goTo(i)}
            aria-label={`Show screen ${i + 1} of ${N}`}
            aria-current={i === cur ? "true" : undefined}
          >
            <span />
          </button>
        ))}
      </div>
    </div>
  );
}
