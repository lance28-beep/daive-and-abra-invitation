"use client"

import { useEffect, useState } from "react"
import { Section } from "@/components/section"
import Counter from "@/components/counter"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Target: June 19, 2026 at 3:00 PM GMT+8
      // 3:00 PM GMT+8 == 07:00 AM UTC
      const targetDate = Date.UTC(2026, 5, 19, 7, 0, 0) // June is month 5 (0-indexed)
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // Wedding has passed or is happening now
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      <div className="relative group">
        <div className="absolute -inset-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" style={{ background: "linear-gradient(135deg, rgba(245,216,176,0.12) 0%, transparent 60%)" }} />
        <div
          className="relative rounded-lg sm:rounded-xl px-2.5 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 transition-all duration-300 min-w-[60px] sm:min-w-[70px] md:min-w-[85px] lg:min-w-[95px] overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #45301F 0%, #875F2C 50%, #45301F 100%)",
            boxShadow: "0 0 0 1px rgba(163,151,106,0.3), 0 4px 16px rgba(69,48,31,0.4), inset 0 1px 0 rgba(245,216,176,0.06)",
          }}
        >
          <div className="absolute inset-0 rounded-lg sm:rounded-xl border border-[rgba(163,151,106,0.35)]" />
          <div
            className="absolute inset-0 opacity-50 rounded-lg sm:rounded-xl"
            style={{ background: "radial-gradient(circle at center, rgba(245,216,176,0.04) 0%, transparent 70%)" }}
          />
          <div className="relative z-10 flex items-center justify-center">
            <Counter
              value={value}
              places={value >= 100 ? [100, 10, 1] : [10, 1]}
              fontSize={28}
              padding={4}
              gap={2}
              textColor="#F5D8B0"
              fontWeight={400}
              borderRadius={6}
              horizontalPadding={3}
              gradientHeight={8}
              gradientFrom="rgba(69,48,31,0.4)"
              gradientTo="transparent"
              counterStyle={{ fontFamily: "var(--font-crimson)" }}
            />
          </div>
        </div>
      </div>
      <span className="text-[10px] sm:text-xs font-[family-name:var(--font-crimson)] font-normal uppercase tracking-wide" style={{ color: "#A2976A" }}>
        {label}
      </span>
    </div>
  )

  return (
    <Section
      id="countdown"
      className="relative py-16 sm:py-20 md:py-24 lg:py-28"
    >
      {/* Header — Crimson Text 400, palette colors */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#A2976A] to-transparent" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal mb-4 sm:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.12em]" style={{ color: "#F5D8B0" }}>
          Countdown to Our Special Day
        </h2>
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#A2976A] to-transparent" />
        </div>
        <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-normal max-w-xl mx-auto leading-relaxed tracking-wide px-2" style={{ color: "#A2976A" }}>
          Every moment brings us closer to forever
        </p>
      </div>

      {/* Main countdown container - Compact for mobile */}
      <div className="relative z-10">
        <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-10 sm:mb-14 md:mb-18 px-3 sm:px-4">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Wedding date presentation */}
        <div className="flex justify-center px-3 sm:px-4 md:px-6">
          <div className="max-w-xl w-full">
              {/* Save The Date — Crimson Text 400, palette */}
              <div className="text-center mb-6 sm:mb-8 md:mb-10">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-[#A2976A] to-[#A2976A]" />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#A2976A" }} />
                  <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent via-[#A2976A] to-[#A2976A]" />
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-normal uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-3 sm:mb-4" style={{ color: "#F5D8B0" }}>
                  Save The Date
                </p>
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-[#A2976A] to-[#A2976A]" />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#A2976A" }} />
                  <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent via-[#A2976A] to-[#A2976A]" />
                </div>
              </div>

              {/* Date Section — Crimson Text 400, palette */}
              <div className="text-center mb-6 sm:mb-8 md:mb-10">
                <div className="mb-3 sm:mb-4 md:mb-5">
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-crimson)] font-normal leading-none" style={{ color: "#F5D8B0" }}>
                    June
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 mb-5 sm:mb-6">
                  <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-crimson)] font-normal leading-none" style={{ color: "#F5D8B0" }}>
                    19
                  </p>
                  <div className="h-10 sm:h-12 md:h-16 lg:h-20 w-[2px] bg-gradient-to-b from-[#A2976A] via-[#F5D8B0] to-[#A2976A]" />
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-crimson)] font-normal leading-none" style={{ color: "#A2976A" }}>
                    2026
                  </p>
                </div>
              </div>

              {/* Time Section — Crimson Text 400, palette */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-[#A2976A] to-[#A2976A]" />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#A2976A" }} />
                  <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent via-[#A2976A] to-[#A2976A]" />
                </div>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)] font-normal tracking-wide mb-3 sm:mb-4" style={{ color: "#F5D8B0" }}>
                  3:00 PM
                </p>
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-[#A2976A] to-[#A2976A]" />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#A2976A" }} />
                  <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent via-[#A2976A] to-[#A2976A]" />
                </div>
              </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
