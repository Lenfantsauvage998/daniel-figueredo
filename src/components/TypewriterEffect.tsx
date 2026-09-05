"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterEffectProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function TypewriterEffect({
  phrases,
  typingSpeed = 60,
  deletingSpeed = 35,
  pauseDuration = 2200,
}: TypewriterEffectProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const phrase = phrases[currentPhraseIndex];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        return;
      }
      const timer = setTimeout(() => {
        setCurrentText(phrase.slice(0, currentText.length - 1));
      }, deletingSpeed);
      return () => clearTimeout(timer);
    }

    if (currentText === phrase) {
      setIsPaused(true);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentText(phrase.slice(0, currentText.length + 1));
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [
    currentText,
    isDeleting,
    isPaused,
    currentPhraseIndex,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return (
    <span className="inline-flex items-center">
      <span className="text-base md:text-lg text-ink-soft font-medium">
        {currentText}
      </span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[2px] h-[1.1em] bg-signal ml-1 align-middle"
      />
    </span>
  );
}
