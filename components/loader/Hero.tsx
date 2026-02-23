"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface HeroProps {
  onOpen: () => void
  visible: boolean
}

export function Hero({ onOpen, visible }: HeroProps) {
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setContentVisible(true), 300)
      return () => clearTimeout(t)
    }
    setContentVisible(false)
  }, [visible])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        visible ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Details/herobackroud.jpg"
          alt="Daive & Abra wedding background"
          fill
          priority
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlays for text readability — aligned with LoadingScreen palette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(69, 48, 31, 0.35), rgba(69, 48, 31, 0.7))",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(69, 48, 31, 0.35) 100%)",
          }}
        />
      </div>

      {/* Content — aligned with sections/hero typography */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 w-full max-w-md mx-auto h-full">
        {/* Monogram — same asset and style as sections/hero */}
        <div
          className={`mb-auto mt-8 transition-all duration-1000 ease-out ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center">
            <Image
              src="/monogram/newmonogram.png"
              alt="Monogram"
              width={192}
              height={192}
              className="h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 object-contain brightness-0 invert drop-shadow-lg"
              priority
            />
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex flex-col items-center justify-end w-full gap-5 sm:gap-6 pb-14 sm:pb-16 md:pb-20">
          <h2
            className={`text-6xl md:text-8xl transform -rotate-6 transition-all duration-1000 ease-out delay-200 ${
              contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontWeight: 400,
              color: "#ffffff",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
            }}
          >
            You are
          </h2>

          <h1
            className={`text-5xl md:text-7xl font-bold tracking-wider uppercase transition-all duration-1000 ease-out delay-300 ${
              contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              fontFamily: "var(--font-crimson), sans-serif",
              fontWeight: 700,
              color: "#ffffff",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
              letterSpacing: "0.05em",
            }}
          >
            Invited!
          </h1>

          <button
            type="button"
            onClick={onOpen}
            className={`px-10 py-4 text-sm font-[family-name:var(--font-crimson)] font-bold tracking-[0.2em] uppercase rounded-sm border transition-all duration-500 delay-500 active:scale-[0.98] ${
              contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              backgroundColor: "#875F2C",
              borderColor: "#A2976A",
              color: "#F5D8B0",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#8F553D"
              e.currentTarget.style.borderColor = "#875F2C"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#875F2C"
              e.currentTarget.style.borderColor = "#A2976A"
            }}
          >
            Open Invitation
          </button>
        </div>

        <div className="h-4" />
      </div>
    </div>
  )
}
