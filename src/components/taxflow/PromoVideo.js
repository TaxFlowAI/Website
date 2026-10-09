"use client";

import { useRef, useState } from "react";
import Image from "next/image";

/* Home page promo film (the owner's, unedited apart from web compression).
   Nothing downloads until the visitor presses play: the poster is a lazy
   next/image and the video has preload="none". Native controls appear once
   it is playing, and the poster comes back when it ends. */

export default function PromoVideo() {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);

  function play() {
    setStarted(true);
    videoRef.current?.play();
  }

  return (
    <div className="tc-about-card tc-promo relative aspect-video">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full"
        src="/videos/taxflow/meet-flo.mp4"
        preload="none"
        playsInline
        controls={started}
        onEnded={() => setStarted(false)}
        aria-label="TaxFlowAI promo video featuring Flo"
      />
      {!started && (
        <button type="button" onClick={play} className="tc-promo-poster group absolute inset-0">
          <Image
            src="/images/taxflow/meet-flo-cover.webp"
            alt=""
            fill
            sizes="(min-width: 1152px) 1088px, 100vw"
            className="object-cover"
          />
          {/* bottom-left: the centre of the poster is Flo's title card */}
          <span className="tc-promo-cta" aria-hidden>
            <span className="tc-promo-play">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
              </svg>
            </span>
            <span className="tc-promo-label">
              Play video
              <span className="tc-mono">1:18</span>
            </span>
          </span>
          <span className="sr-only">Play the TaxFlowAI video, 1 minute 18 seconds, with sound</span>
        </button>
      )}
    </div>
  );
}
