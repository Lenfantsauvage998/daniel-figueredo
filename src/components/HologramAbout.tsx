"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { MapPin } from "lucide-react";
import { useI18n } from "./I18nProvider";

const skills = [
  "SQL",
  "Pandas & Matplotlib",
  "Statistics",
  "Business Analysis",
  "Claude Code, Codex & Cursor",
  "Web Development",
];

type Fade = MotionValue<number>;

/**
 * Binds a scroll value straight to an element's opacity.
 * Framer's own style binding routes these through WAAPI, which overrides the
 * inline style and eases toward a target instead of tracking the scroll.
 */
function useOpacityRef<T extends HTMLElement | SVGElement>(value: Fade) {
  const ref = useRef<T>(null);
  const apply = useCallback(() => {
    const node = ref.current;
    if (node) node.style.opacity = String(value.get());
  }, [value]);
  useMotionValueEvent(value, "change", apply);
  useEffect(apply, [apply]);
  return ref;
}

function GridFloor({ opacity }: { opacity: Fade }) {
  const rays = Array.from({ length: 19 }, (_, i) => -9 + i);
  const ref = useOpacityRef<SVGSVGElement>(opacity);
  return (
    <svg
      ref={ref}
      style={{ opacity: 0 }}
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 w-full h-[46%] pointer-events-none"
      aria-hidden="true"
    >
      <g stroke="#ff5fa2" strokeWidth="1.1" fill="none" opacity="0.3">
        {rays.map((r) => (
          <line key={r} x1="600" y1="0" x2={600 + r * 190} y2="400" />
        ))}
        {[0.1, 0.24, 0.42, 0.63, 0.86].map((p, i) => (
          <line
            key={i}
            x1="0"
            y1={400 * p * p + 40}
            x2="1200"
            y2={400 * p * p + 40}
            opacity={0.4 + p * 0.6}
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * Daniel is a real 3D render (public/daniel.webp). Scroll crossfades the render
 * into a scanline-masked "hologram" copy of itself, so the reveal survives
 * without hand-drawing the figure.
 */
function Figure({ solidOpacity, wireOpacity }: { solidOpacity: Fade; wireOpacity: Fade }) {
  const beamRef = useOpacityRef<SVGSVGElement>(wireOpacity);
  const solidRef = useOpacityRef<HTMLDivElement>(solidOpacity);
  const scanRef = useOpacityRef<HTMLDivElement>(wireOpacity);
  return (
    <div className="relative w-full h-full">
      {/* projection beam and platform, behind him */}
      <svg
        ref={beamRef}
        style={{ opacity: 0 }}
        viewBox="0 0 300 460"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="beamCone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff5fa2" stopOpacity="0" />
            <stop offset="100%" stopColor="#ff5fa2" stopOpacity="0.3" />
          </linearGradient>
          <radialGradient id="discGlow">
            <stop offset="0%" stopColor="#ffc4e0" />
            <stop offset="70%" stopColor="#ff5fa2" />
            <stop offset="100%" stopColor="#b81f6e" />
          </radialGradient>
        </defs>
        <path d="M92 190h116l52 226H40z" fill="url(#beamCone)" />
        <ellipse cx="150" cy="428" rx="96" ry="26" fill="url(#discGlow)" opacity="0.34" />
        <ellipse cx="150" cy="421" rx="74" ry="19" fill="none" stroke="#ffc4e0" strokeWidth="3" />
        <ellipse cx="150" cy="433" rx="90" ry="23" fill="none" stroke="#ff5fa2" strokeWidth="2" opacity="0.6" />
      </svg>

      {/* the render itself */}
      <div
        ref={solidRef}
        style={{ opacity: 1 }}
        className="absolute inset-x-0 top-0 bottom-[9%] flex items-end justify-center"
      >
        <Image
          src="/daniel.webp"
          alt="Daniel"
          width={316}
          height={863}
          priority
          unoptimized
          className="h-full w-auto drop-shadow-[0_20px_34px_rgba(0,0,0,0.45)]"
        />
      </div>

      {/* the same render, scanned */}
      <div
        ref={scanRef}
        style={{ opacity: 0 }}
        className="absolute inset-x-0 top-0 bottom-[9%] flex items-end justify-center"
        aria-hidden="true"
      >
        <div className="relative h-full">
          <Image
            src="/daniel.webp"
            alt=""
            width={316}
            height={863}
            unoptimized
            className="h-full w-auto"
            style={{
              filter:
                "grayscale(1) brightness(1.45) sepia(1) hue-rotate(268deg) saturate(7) drop-shadow(0 0 18px rgba(255,95,162,0.55))",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              WebkitMaskImage: "url(/daniel.webp)",
              maskImage: "url(/daniel.webp)",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              background:
                "repeating-linear-gradient(to bottom, rgba(255,214,235,0.5) 0px, rgba(255,214,235,0.5) 1px, transparent 1px, transparent 5px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Pin({
  progress,
  at,
  side,
  children,
}: {
  progress: MotionValue<number>;
  at: number;
  side: "left" | "right";
  children: React.ReactNode;
}) {
  const el = useRef<HTMLDivElement>(null);
  const from = side === "left" ? -24 : 24;
  const revealed = useTransform(progress, [at, at + 0.12], [0, 1]);
  const slide = useTransform(progress, [at, at + 0.12], [from, 0]);

  // Written straight to the DOM. Handing framer both `opacity` and `x` made it
  // animate the pair through WAAPI, which overrode the inline style and lagged
  // behind the scroll instead of tracking it.
  const apply = useCallback(() => {
    const node = el.current;
    if (!node) return;
    node.style.opacity = String(revealed.get());
    node.style.transform = `translateX(${slide.get()}px)`;
  }, [revealed, slide]);

  useMotionValueEvent(revealed, "change", apply);
  useEffect(apply, [apply]);

  return (
    <div ref={el} style={{ opacity: 0, transform: `translateX(${from}px)` }}>
      <div className="relative rounded-2xl border border-beam/40 bg-deep-lift/70 backdrop-blur-sm px-5 py-4 shadow-[0_0_30px_rgba(255,95,162,0.15)]">
        {children}
        <span
          className={`hidden lg:block absolute top-1/2 w-10 h-px bg-beam/60 ${
            side === "left" ? "left-full" : "right-full"
          }`}
        />
        <span
          className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-beam ${
            side === "left" ? "left-[calc(100%+2.5rem)]" : "right-[calc(100%+2.5rem)]"
          }`}
        />
      </div>
    </div>
  );
}

export function HologramAbout() {
  const { lang, t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const solidOpacity = useTransform(scrollYProgress, [0.08, 0.32], [1, 0]);
  const wireOpacity = useTransform(scrollYProgress, [0.16, 0.4], [0, 1]);
  const gridOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);
  const counter = useTransform(scrollYProgress, [0.1, 0.72], [41, 99]);
  const hintFade = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Written straight to the DOM — routing this through React state re-rendered the
  // section on every scroll frame, which made framer re-animate the pins instead of
  // binding them to scroll.
  useMotionValueEvent(counter, "change", (v) => {
    const el = readoutRef.current;
    if (el) el.textContent = String(Math.round(v)).padStart(3, "0");
  });

  useMotionValueEvent(hintFade, "change", (v) => {
    const el = hintRef.current;
    if (el) el.style.opacity = String(v);
  });

  return (
    <section
      ref={ref}
      id="about-section"
      className="relative bg-deep text-beam-text min-h-[160vh] lg:h-[280vh]"
    >
      <div className="relative lg:sticky lg:top-0 lg:h-screen overflow-hidden py-24 lg:py-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_65%,#5c2a85_0%,#2a1140_55%,#190a29_100%)]" />
        <GridFloor opacity={gridOpacity} />

        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <h2 className="sr-only">{t.aboutLabel}</h2>

          <div className="grid lg:grid-cols-[1fr_auto_1fr] items-center gap-6 lg:gap-10">
            <div className="space-y-5 lg:justify-self-end lg:max-w-[290px] w-full order-2 lg:order-1">
              <Pin progress={scrollYProgress} at={0.3} side="left">
                <p className="font-mono text-2xl font-bold tracking-tight text-white">
                  {t.aboutName}
                </p>
                <p className="mt-0.5 font-mono text-[15px] font-semibold text-beam">
                  {t.aboutRole}
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[13px] text-beam-soft">
                  <MapPin className="w-3.5 h-3.5" />
                  {t.aboutLocation}
                </p>
              </Pin>

              <Pin progress={scrollYProgress} at={0.46} side="left">
                <p className="font-mono text-[13px] leading-relaxed text-beam-text/90">
                  {t.aboutBio}
                </p>
              </Pin>
            </div>

            <div className="relative w-[230px] sm:w-[300px] h-[420px] sm:h-[540px] mx-auto order-1 lg:order-2">
              <Figure solidOpacity={solidOpacity} wireOpacity={wireOpacity} />
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                <span
                  ref={readoutRef}
                  className="font-mono text-lg font-bold tracking-[0.2em] text-white bg-deep-lift/80 border border-beam/40 rounded-lg px-3 py-1 tabular-nums"
                >
                  041
                </span>
              </div>
            </div>

            <div className="lg:max-w-[300px] w-full order-3">
              <Pin progress={scrollYProgress} at={0.38} side="right">
                <p className="font-mono text-lg font-bold text-white mb-2.5">
                  {t.aboutSkillsLabel}
                </p>
                <ul className="space-y-1.5">
                  {skills.map((s) => (
                    <li
                      key={s}
                      className="font-mono text-[13px] text-beam-text/85 flex gap-2"
                    >
                      <span className="text-beam">·</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </Pin>
            </div>
          </div>

          <p
            ref={hintRef}
            className="hidden lg:block absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-xs text-beam-soft whitespace-nowrap"
          >
            {t.aboutHint}
          </p>
        </div>
      </div>
    </section>
  );
}
