"use client"

import { useEffect, useState } from "react"

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
            background: 'linear-gradient(135deg, #45301F 0%, #875F2C 40%, #45301F 100%)',
            boxShadow: '0 0 0 1px rgba(163,151,106,0.2), 0 8px 32px rgba(69,48,31,0.5), 0 30px 90px rgba(0,0,0,0.25), inset 0 1px 0 rgba(245,216,176,0.06)',
          }}
        >
          {/* Base gradient — LoadingScreen palette */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#45301F] via-[#875F2C] to-[#45301F]" />
          
          {/* Subtle radial gradient for depth */}
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              background: 'radial-gradient(circle at center, rgba(245,216,176,0.04) 0%, transparent 70%)',
            }}
          />
          
          {/* Elegant border with gradient — palette */}
          <div 
            className="absolute inset-0 rounded-[22px] sm:rounded-[26px] md:rounded-[30px]"
            style={{
              padding: '1px',
              background: 'linear-gradient(135deg, rgba(245,216,176,0.2) 0%, rgba(163,151,106,0.15) 50%, rgba(245,216,176,0.15) 100%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
          
          {/* Inner border for refinement */}
          <div className="absolute inset-[1px] rounded-[21px] sm:rounded-[25px] md:rounded-[29px] border border-[rgba(163,151,106,0.25)]" />
          
          {/* Content wrapper */}
          <div className="relative z-10">
          {/* Monogram — tinted #F5D8B0 */}
          <div className="mb-8 sm:mb-9 md:mb-10 flex justify-center">
            <div
              className="h-36 w-36 sm:h-40 sm:w-40 md:h-44 md:w-44 lg:h-48 lg:w-48 flex-shrink-0 [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]"
              style={{
                backgroundColor: "#F5D8B0",
                maskImage: "url(/monogram/newmonogram.png)",
                WebkitMaskImage: "url(/monogram/newmonogram.png)",
              }}
              role="img"
              aria-label="Daive & Abra"
            />
          </div>

          {/* Small intro text — Crimson Text 400 */}
          <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-normal tracking-[0.32em] uppercase mb-4 sm:mb-5" style={{ color: "#A2976A" }}>
            Together with their families
          </p>

          {/* Names block — Crimson Text 400 */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 mb-4 sm:mb-5 md:mb-6">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl md:text-[3rem] leading-none font-[family-name:var(--font-crimson)] font-normal tracking-[0.15em] uppercase" style={{ color: "#F5D8B0" }}>
                Daive
              </p>
            </div>
            <p className="text-[10px] sm:text-xs tracking-[0.3em] font-[family-name:var(--font-crimson)] font-normal uppercase" style={{ color: "#A2976A" }}>
              and
            </p>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl md:text-[3rem] leading-none font-[family-name:var(--font-crimson)] font-normal tracking-[0.15em] uppercase" style={{ color: "#F5D8B0" }}>
                Abra
              </p>
            </div>
          </div>

          {/* Date & location — Crimson Text 400 */}
          <p className="text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-normal tracking-[0.2em] uppercase mb-2" style={{ color: "#F5D8B0" }}>
            June 19, 2026
          </p>
          <p className="text-[10px] sm:text-xs font-[family-name:var(--font-crimson)] font-normal tracking-[0.2em] mb-6 sm:mb-7" style={{ color: "#A2976A" }}>
            Paoay, Ilocos Norte, Philippines
          </p>

          {/* Invite line — Crimson Text 400 */}
          <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-normal tracking-[0.32em] uppercase mb-6 sm:mb-7" style={{ color: "#F5D8B0" }}>
            warmly invite you to celebrate their marriage
          </p>

          {/* Fine divider before invitation message */}
          <div className="mt-6 sm:mt-7 md:mt-8 mb-6 sm:mb-7 flex justify-center">
            <div className="h-px w-24 sm:w-32 md:w-40 bg-gradient-to-r from-transparent via-[#A2976A] to-transparent" />
          </div>

          {/* Invitation message — Crimson Text 400 */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 max-w-md mx-auto">
            <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-normal leading-relaxed italic" style={{ color: "#F5D8B0" }}>
              With hearts full of love and joy,
              we invite you to join us for an intimate celebration
              as we unite our lives in marriage,
              placing God at the center of our union.
            </p>
            <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-normal leading-relaxed italic" style={{ color: "rgba(245,216,176,0.92)" }}>
              By His grace our paths have been woven together,
              and in His presence we vow to walk side by side,
              guided by faith, love, and devotion.
            </p>
            <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-normal leading-relaxed italic" style={{ color: "#F5D8B0" }}>
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
