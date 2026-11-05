"use client";

import React, { useState, useEffect } from "react";

interface DynamicTypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
  className?: string;
  cursorClassName?: string;
}

export function DynamicTypewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  delayBetweenWords = 1800,
  className = "",
  cursorClassName = "text-cyan-400",
}: DynamicTypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullWord = words[currentWordIndex % words.length];

    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }, deletingSpeed);
    } else {
      if (currentText === currentFullWord) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenWords);
      } else {
        timer = setTimeout(() => {
          setCurrentText(currentFullWord.slice(0, currentText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span>{currentText}</span>
      <span
        className={`ml-1 inline-block w-[3px] h-[1em] translate-y-[2px] bg-cyan-400 animate-pulse ${cursorClassName}`}
      />
    </span>
  );
}

