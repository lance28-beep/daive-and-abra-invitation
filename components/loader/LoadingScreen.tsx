"use client"

import React, { useEffect, useState } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

// Wedding date: June 19, 2026 → 06 19 26
const GHOST_NUMBERS = ["06", "19", "26"]
const COUPLE_NAMES = { groom: "Daive", bride: "Abra" }

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false)
  const [progress, setProgress] = useState(0)
  const [monogramVisible, setMonogramVisible] = useState(false)
  const [nameVisible, setNameVisible] = useState(false)
  const [supportVisible, setSupportVisible] = useState(false)
  const [progressVisible, setProgressVisible] = useState(false)

  useEffect(() => {
    const t0 = setTimeout(() => setMonogramVisible(true), 80)
    const t1 = setTimeout(() => setNameVisible(true), 280)
    const t2 = setTimeout(() => setSupportVisible(true), 540)
    const t3 = setTimeout(() => setProgressVisible(true), 740)
    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + 2
      })
    }, 160)

    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(onComplete, 500)
    }, 8000)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-500 ease-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading invitation"
    >
      {/* Warm brown background — #45301F */}
      <div className="absolute inset-0 bg-[#45301F]" />

      {/* Ghosted background numbers — right side, stacked */}
      <div
        className="absolute inset-0 pointer-events-none flex flex-col items-end justify-center pr-6 sm:pr-10 md:pr-14 lg:pr-20 gap-0 select-none"
        aria-hidden
      >
        {GHOST_NUMBERS.map((num, i) => (
          <span
            key={num}
            className="text-[7rem] sm:text-[9rem] md:text-[11rem] lg:text-[13rem] font-bold leading-[0.85] transition-opacity duration-1000 ease-out"
            style={{
              fontFamily: "var(--font-crimson)",
              fontWeight: 700,
              color: "rgba(245, 216, 176, 0.06)",
              letterSpacing: "-0.03em",
              opacity: nameVisible ? 1 : 0,
              transitionDelay: `${i * 80}ms`,
            }}
          >
            {num}
          </span>
        ))}
      </div>

      {/* Main content — centered */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-6 sm:px-8 md:px-10 text-center">
        {/* Monogram — top, tinted #F5D8B0 */}
        <div
          className={`mb-8 sm:mb-10 transition-all duration-700 ease-out flex justify-center ${
            monogramVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <div
            className="h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 flex-shrink-0 object-contain object-center [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]"
            style={{
              backgroundColor: "#F5D8B0",
              maskImage: "url(/monogram/newmonogram.png)",
              WebkitMaskImage: "url(/monogram/newmonogram.png)",
            }}
            role="img"
            aria-label="Monogram"
          />
        </div>

        {/* Names — staggered entrance — Crimson Text 700, palette colors */}
        <h1
          className={`transition-all duration-700 ease-out mb-3 sm:mb-4 font-bold tracking-[0.2em] uppercase`}
          style={{ fontFamily: "var(--font-crimson)", fontWeight: 700 }}
        >
          <span
            className={`inline-block text-3xl sm:text-4xl md:text-5xl ${
              nameVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } transition-all duration-700 ease-out`}
            style={{ color: "#F5D8B0" }}
          >
            {COUPLE_NAMES.groom}
          </span>
          <span
            className="text-2xl sm:text-3xl md:text-4xl mx-2 font-normal"
            style={{ color: "#A2976A", fontFamily: "var(--font-ephesis)" }}
          >
            &amp;
          </span>
          <span
            className={`inline-block text-3xl sm:text-4xl md:text-5xl font-bold ${
              nameVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } transition-all duration-700 ease-out`}
            style={{ color: "#F5D8B0" }}
          >
            {COUPLE_NAMES.bride}
          </span>
        </h1>

        {/* Supporting line — Crimson Text 700 */}
        <p
          className={`text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-12 sm:mb-14 transition-all duration-600 ease-out ${
            supportVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ fontFamily: "var(--font-crimson)", fontWeight: 700, color: "#A2976A" }}
        >
          Together with their families
        </p>

        {/* Loading + progress — staggered */}
        <div
          className={`transition-all duration-600 ease-out ${
            progressVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <p
            className="text-xs sm:text-sm tracking-[0.22em] uppercase mb-5 sm:mb-6"
            style={{ fontFamily: "var(--font-crimson)", fontWeight: 700, color: "#F5D8B0" }}
          >
            Preparing your invitation
          </p>

          {/* Progress bar — track #875F2C, fill #F5D8B0 */}
          <div className="w-full max-w-[220px] mx-auto mb-3">
            <div
              className="h-0.5 sm:h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: "#875F2C" }}
              role="presentation"
            >
              <div
                className="h-full rounded-full transition-all duration-300 ease-out min-w-[2px]"
                style={{ width: `${Math.max(progress, 2)}%`, backgroundColor: "#F5D8B0" }}
              />
            </div>
          </div>
          <p
            className="text-[10px] sm:text-xs tracking-[0.25em] tabular-nums"
            style={{ fontFamily: "var(--font-crimson)", fontWeight: 700, color: "#A2976A" }}
            aria-live="polite"
          >
            {progress}%
          </p>
        </div>
      </div>
    </div>
  )
}
