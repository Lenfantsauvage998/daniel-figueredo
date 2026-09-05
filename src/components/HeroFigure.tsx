"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useI18n } from "./I18nProvider";

const chips = [
  { label: "SQL", at: "left-[1%] top-[30%]", depth: 30 },
  { label: "Pandas", at: "left-0 top-[54%]", depth: 44 },
  { label: "Statistics", at: "right-0 top-[15%]", depth: 34 },
  { label: "Matplotlib", at: "right-[1%] top-[45%]", depth: 48 },
  { label: "Business Analysis", at: "left-[3%] bottom-[13%]", depth: 26 },
];

/** Pointer parallax — larger depth reads as closer to the viewer. */
function useParallax() {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 60, damping: 18, mass: 0.6 });
  const y = useSpring(py, { stiffness: 60, damping: 18, mass: 0.6 });

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return { x, y, onPointerMove, onPointerLeave };
}

function Chip({
  label,
  at,
  depth,
  x,
  y,
  delay,
}: {
  label: string;
  at: string;
  depth: number;
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
  delay: number;
}) {
  const dx = useTransform(x, (v) => v * depth);
  const dy = useTransform(y, (v) => v * depth);

  return (
    <motion.div
      style={{ x: dx, y: dy }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.6, 0, 0.25, 1] }}
      className={`absolute ${at} z-20 hidden lg:block`}
    >
      <span className="block rounded-2xl bg-sand-lift border border-sand-edge px-4 py-2.5 text-sm font-bold text-ink shadow-[0_8px_22px_rgba(30,35,29,0.10)]">
        {label}
      </span>
    </motion.div>
  );
}

export function HeroFigure() {
  const { t } = useI18n();
  const { x, y, onPointerMove, onPointerLeave } = useParallax();

  const figureX = useTransform(x, (v) => v * 16);
  const figureY = useTransform(y, (v) => v * 16);

  return (
    <div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative w-full max-w-[560px] mx-auto aspect-[4/5]"
    >
      {/* warm pool of light behind him */}
      <div className="absolute inset-x-[12%] inset-y-[6%] rounded-full bg-sand-deep/70 blur-2xl" />

      {chips.map((c, i) => (
        <Chip
          key={c.label}
          label={c.label}
          at={c.at}
          depth={c.depth}
          x={x}
          y={y}
          delay={0.5 + i * 0.09}
        />
      ))}

      <motion.div
        style={{ x: figureX, y: figureY }}
        className="absolute inset-0 flex items-end justify-center"
      >
        <div className="relative h-[86%] drift-slow">
          <Image
            src="/daniel-greeting.webp"
            alt="Daniel Figueredo waving hello"
            width={900}
            height={1641}
            priority
            unoptimized
            className="h-full w-auto drop-shadow-[0_26px_30px_rgba(30,35,29,0.28)]"
          />

          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1, duration: 0.45, ease: [0.6, 0, 0.25, 1] }}
            className="absolute -top-8 -left-14 sm:-left-20 z-30"
          >
            <span className="relative block rounded-3xl rounded-br-md bg-white px-5 py-3 text-xl font-extrabold text-ink shadow-[0_10px_26px_rgba(30,35,29,0.16)]">
              {t.sceneGreeting}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* contact shadow on the floor */}
      <div className="absolute bottom-[3%] left-1/2 -translate-x-1/2 h-5 w-[42%] rounded-[50%] bg-ink/15 blur-md" />
    </div>
  );
}
