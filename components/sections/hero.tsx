"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-center justify-center min-h-screen py-16 sm:py-20">
        {/* Main invitation card */}
        <div
          className={`w-full max-w-xl md:max-w-2xl relative rounded-[22px] sm:rounded-[26px] md:rounded-[30px] text-center px-6 sm:px-10 md:px-14 py-10 sm:py-12 md:py-14 transition-all duration-700 ease-out overflow-hidden ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #050505 100%)',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.6), 0 30px 90px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          {/* Premium black base with elegant gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#050505]" />
          
          {/* Subtle radial gradient for depth */}
          <div 
            className="absolute inset-0 opacity-60"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.02) 0%, transparent 70%)',
            }}
          />
          
          {/* Elegant shimmer gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[rgba(255,255,255,0.01)] to-transparent opacity-50" />
          
          {/* Elegant border with gradient */}
          <div 
            className="absolute inset-0 rounded-[22px] sm:rounded-[26px] md:rounded-[30px]"
            style={{
              padding: '1px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
          
          {/* Inner border for refinement */}
          <div className="absolute inset-[1px] rounded-[21px] sm:rounded-[25px] md:rounded-[29px] border border-[rgba(255,255,255,0.08)]" />
          
          {/* Content wrapper */}
          <div className="relative z-10">
          {/* Monogram */}
          <div className="mb-8 sm:mb-9 md:mb-10 flex justify-center">
            <Image
              src="/monogram/monogram.png"
              alt="Japoi & Regine"
              width={240}
              height={240}
              className="h-36 w-36 sm:h-40 sm:w-40 md:h-44 md:w-44 lg:h-48 lg:w-48 object-contain object-center brightness-0 invert"
              priority
            />
          </div>

          {/* Small intro text */}
          <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] tracking-[0.32em] text-zinc-400 uppercase mb-6 sm:mb-7">
            Together with their families
          </p>

          {/* Names block */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 mb-6 sm:mb-7 md:mb-8">
            {/* Japoi */}
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl md:text-[3rem] leading-none font-[family-name:var(--font-crimson)] tracking-[0.2em] text-zinc-50 uppercase">
                Japoi
              </p>
              <p className="text-2xl sm:text-3xl md:text-[2.5rem] font-[family-name:var(--font-chicanos)] text-zinc-300 leading-tight">
                Abriam
              </p>
            </div>

            {/* AND */}
            <p className="text-[10px] sm:text-xs tracking-[0.3em] font-[family-name:var(--font-crimson)] text-zinc-500 uppercase">
              and
            </p>

            {/* Regine */}
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl md:text-[3rem] leading-none font-[family-name:var(--font-crimson)] tracking-[0.2em] text-zinc-50 uppercase">
                Regine
              </p>
              <p className="text-2xl sm:text-3xl md:text-[2.5rem] font-[family-name:var(--font-chicanos)] text-zinc-300 leading-tight">
                Laguitao
              </p>
            </div>
          </div>

          {/* Invite line */}
          <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] tracking-[0.32em] text-zinc-400 uppercase mb-6 sm:mb-7">
            warmly invite you to celebrate their marriage
          </p>

          {/* Fine divider before date section */}
          <div className="mb-6 sm:mb-7 md:mb-8 flex justify-center">
            <div className="h-px w-24 sm:w-32 md:w-40 bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
          </div>

          {/* Date + time block */}
          <div className="mb-7 sm:mb-9 md:mb-10">
            {/* Month */}
            <p className="text-[11px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] tracking-[0.38em] text-zinc-400 uppercase mb-4 sm:mb-5">
              March
            </p>

            {/* Day row: weekday / day / time */}
            <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-14 mb-3 sm:mb-4">
              <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] tracking-[0.3em] text-zinc-500 uppercase">
                Sunday
              </p>

              <p className="text-4xl sm:text-5xl md:text-[3.25rem] font-[family-name:var(--font-crimson)] text-zinc-50 leading-none">
                15
              </p>

              <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] tracking-[0.3em] text-zinc-500 uppercase">
                At 4 PM
              </p>
            </div>

            {/* Year */}
            <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] tracking-[0.3em] text-zinc-400 uppercase">
              2026
            </p>
          </div>

          {/* Fine divider before invitation message */}
          <div className="mt-6 sm:mt-7 md:mt-8 mb-6 sm:mb-7 flex justify-center">
            <div className="h-px w-24 sm:w-32 md:w-40 bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
          </div>

          {/* Invitation message */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 max-w-md mx-auto">
            <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-zinc-200 leading-relaxed italic">
              With hearts full of love and joy,
              we invite you to join us for an intimate celebration
              as we unite our lives in marriage,
              placing God at the center of our union.
            </p>
            <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-zinc-200 leading-relaxed italic">
              By His grace our paths have been woven together,
              and in His presence we vow to walk side by side,
              guided by faith, love, and devotion.
            </p>
            <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-zinc-200 leading-relaxed italic">
              Your presence will be a blessing,
              adding warmth to a day that is both
              a celebration of love and a testimony of His goodness.
            </p>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
