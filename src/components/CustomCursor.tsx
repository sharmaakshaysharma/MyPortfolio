"use client";

import React, { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isHoveringInput, setIsHoveringInput] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  // Direct mouse coords
  const mousePos = useRef({ x: -100, y: -100 });
  // Smooth trailing ring coords (Lerp)
  const ringPos = useRef({ x: -100, y: -100 });
  
  // DOM element refs for 120fps direct hardware-accelerated transform
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on devices with a fine pointer (desktop / laptop mice & trackpads)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;
    
    setIsEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Fast update for the center dot (zero latency)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if target or any parent is interactive
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      const clickable = target.closest(
        'a, button, [role="button"], input[type="submit"], input[type="button"], select, .cursor-pointer, [data-cursor]'
      );

      setIsHoveringInput(Boolean(isInput));
      setIsHoveringClickable(Boolean(clickable) && !isInput);

      // Check for custom cursor label
      const customLabel = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      setCursorText(customLabel || null);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Physics Lerp Loop for Apple VisionOS smooth trailing ring
    const renderLoop = () => {
      // Lerp formula: current + (target - current) * factor
      const lerpFactor = 0.22;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!isEnabled) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* 1. Precision Center Laser Dot (Moves instantaneously with cursor) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 will-change-transform pointer-events-none transition-transform duration-75 ease-out"
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            isHoveringInput
              ? "w-0.5 h-5 -ml-[1px] -mt-2.5 bg-cyan-300 shadow-[0_0_8px_#00f0ff] animate-pulse"
              : isHoveringClickable
              ? "w-2.5 h-2.5 -ml-0.5 -mt-0.5 bg-cyan-300 shadow-[0_0_12px_#00f0ff,0_0_20px_#00ff9d] scale-125"
              : isMouseDown
              ? "w-1.5 h-1.5 ml-0.5 mt-0.5 bg-emerald-400 shadow-[0_0_10px_#00ff9d]"
              : "w-2 h-2 bg-gradient-to-tr from-cyan-400 to-emerald-300 shadow-[0_0_8px_rgba(0,240,255,0.9),0_0_15px_rgba(0,255,157,0.5)]"
          }`}
        />
      </div>

      {/* 2. Fluid Frosted Glass VisionOS Halo Ring (Trails with smooth physics) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 will-change-transform pointer-events-none"
      >
        <div
          className={`relative -top-1/2 -left-1/2 flex items-center justify-center rounded-full transition-all duration-300 ease-out ${
            isHoveringInput
              ? "w-7 h-7 -translate-x-1/2 -translate-y-1/2 border border-cyan-400/40 bg-cyan-400/5 backdrop-blur-[2px] opacity-70"
              : isHoveringClickable
              ? "w-13 h-13 -translate-x-1/2 -translate-y-1/2 border border-cyan-300/80 bg-gradient-to-br from-cyan-400/15 via-emerald-400/10 to-transparent backdrop-blur-md shadow-[0_0_30px_rgba(0,240,255,0.45),inset_0_1px_1.5px_rgba(255,255,255,0.5)] scale-110"
              : isMouseDown
              ? "w-7 h-7 -translate-x-1/2 -translate-y-1/2 border-2 border-emerald-400/90 bg-emerald-400/20 shadow-[0_0_20px_rgba(0,255,157,0.6)] scale-90"
              : "w-9 h-9 -translate-x-1/2 -translate-y-1/2 border border-cyan-400/40 bg-white/[0.03] backdrop-blur-[2px] shadow-[0_0_18px_rgba(0,240,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.3)]"
          }`}
        >
          {/* Subtle Rotating Crosshair Ticks for High-Tech feel when hovering */}
          {isHoveringClickable && (
            <>
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-cyan-300 rounded-full shadow-[0_0_5px_#00f0ff]" />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-cyan-300 rounded-full shadow-[0_0_5px_#00f0ff]" />
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 h-1.5 w-0.5 bg-cyan-300 rounded-full shadow-[0_0_5px_#00f0ff]" />
              <span className="absolute -right-1 top-1/2 -translate-y-1/2 h-1.5 w-0.5 bg-cyan-300 rounded-full shadow-[0_0_5px_#00f0ff]" />
            </>
          )}

          {/* Optional Micro-label like 'EXPLORE' / 'VIEW' */}
          {cursorText && (
            <span className="text-[9px] font-mono font-bold tracking-widest text-cyan-200 uppercase px-1.5 py-0.5 rounded-full bg-slate-950/80 border border-cyan-400/50 shadow-md">
              {cursorText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

