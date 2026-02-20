"use client"

import { Heart } from "lucide-react"
import Image from "next/image"

interface TimelineEvent {
  time: string
  event: string
  image?: string
  Icon?: React.ComponentType<{ className?: string }>
}

const timelineEvents: TimelineEvent[] = [
  { time: "3:00 PM", event: "The Union", image: "/TimelineImage/arrivalimage.png" },
  { time: "4:30 PM", event: "Sunset Toast", image: "/TimelineImage/Cocktail2.png" },
  { time: "5:30 PM", event: "Program", image: "/TimelineImage/StartoftheProgram.png" },
  { time: "9:00 PM", event: "Evening of Ever After", image: "/TimelineImage/AfterParty.png" },
]

export function WeddingTimeline() {
  return (
    <section
      id="timeline"
      className="relative py-8 sm:py-12 md:py-16 lg:py-20"
    >
      {/* Section Header */}
      <div className="relative z-10 text-center mb-6 sm:mb-10 md:mb-12 px-3 sm:px-4 md:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal mb-3 sm:mb-4 md:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em]" style={{ color: "#F5D8B0" }}>
          Wedding Program Flow
        </h2>
        <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-normal max-w-xl mx-auto leading-relaxed tracking-wide px-2 sm:px-4" style={{ color: "#A2976A" }}>
          Join us throughout the day
        </p>
      </div>

      {/* Central Card Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="relative group">
          <div
            className="relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #45301F 0%, #875F2C 40%, #45301F 100%)",
              boxShadow: "0 0 0 1px rgba(163,151,106,0.25), 0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(245,216,176,0.06)",
            }}
          >
            <div className="absolute inset-0 opacity-50 z-0" style={{ background: "radial-gradient(circle at center, rgba(245,216,176,0.04) 0%, transparent 70%)" }} />
            <div
              className="absolute inset-0 rounded-xl sm:rounded-2xl z-0"
              style={{
                padding: "1px",
                background: "linear-gradient(135deg, rgba(245,216,176,0.2) 0%, rgba(163,151,106,0.15) 50%, rgba(245,216,176,0.15) 100%)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <div className="absolute inset-[1px] rounded-xl sm:rounded-2xl border border-[rgba(163,151,106,0.3)] z-0" />

            {/* Card content */}
            <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10">
              {/* Timeline Events */}
              <div className="relative">
                <div className="absolute left-8 sm:left-10 md:left-12 lg:left-16 xl:left-[4.5rem] top-0 bottom-0 w-0.5 hidden sm:block" style={{ background: "linear-gradient(to bottom, rgba(163,151,106,0.3), rgba(163,151,106,0.5), rgba(163,151,106,0.3))" }} />

                <div className="space-y-5 sm:space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12">
                  {timelineEvents.map((item, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
                        <div className="flex-shrink-0 relative z-10 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-36 xl:h-36">
                          {item.Icon ? (
                            <span className="w-full h-full flex items-center justify-center" style={{ color: "#A2976A" }}>
                              <item.Icon className="w-full h-full" />
                            </span>
                          ) : item.image ? (
                            <Image
                              src={item.image}
                              alt={item.event}
                              width={96}
                              height={96}
                              className="w-full h-full object-contain brightness-0 invert"
                            />
                          ) : null}
                        </div>

                        <div className="flex-1 pt-1 sm:pt-2 md:pt-3 lg:pt-4">
                          <div className="mb-2 sm:mb-3 md:mb-4">
                            <span className="inline-block text-[10px] sm:text-xs md:text-sm lg:text-base font-[family-name:var(--font-crimson)] font-normal uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 rounded-full border" style={{ color: "#F5D8B0", backgroundColor: "rgba(163,151,106,0.2)", borderColor: "rgba(163,151,106,0.4)" }}>
                              {item.time}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-[family-name:var(--font-crimson)] font-normal leading-tight" style={{ color: "#F5D8B0" }}>
                            {item.event}
                          </h3>
                        </div>
                      </div>

                      {index < timelineEvents.length - 1 && (
                        <div className="absolute left-8 top-20 sm:hidden w-0.5 h-6 bg-[#A2976A]/40" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 my-8 sm:my-10 md:my-12 lg:my-16 xl:my-20">
                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#A2976A]/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#A2976A]" />
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" style={{ color: "#A2976A" }} fill="currentColor" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#A2976A]" />
                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#A2976A]/50" />
              </div>

              <div className="relative rounded-lg sm:rounded-xl border p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12" style={{ borderColor: "rgba(163,151,106,0.3)", background: "rgba(69,48,31,0.4)" }}>
                <blockquote className="relative max-w-md mx-auto text-center">
                  <span className="absolute -left-1 -top-2 sm:-top-3 text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-ephesis)] leading-none select-none" style={{ color: "rgba(163,151,106,0.5)" }} aria-hidden>&ldquo;</span>
                  <div className="space-y-0.5 sm:space-y-1 font-[family-name:var(--font-crimson)] font-normal text-sm sm:text-base md:text-lg leading-snug tracking-wide" style={{ color: "rgba(245,216,176,0.95)" }}>
                    <p className="italic">He has made everything beautiful in its time.</p>
                    <p className="italic">Ecclesiastes 3:11</p>
                  </div>
                  <span className="absolute -right-1 -bottom-2 sm:-bottom-3 text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-ephesis)] leading-none select-none" style={{ color: "rgba(163,151,106,0.5)" }} aria-hidden>&rdquo;</span>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
