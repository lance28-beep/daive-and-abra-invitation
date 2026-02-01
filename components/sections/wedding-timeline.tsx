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
  { time: "4:00 PM", event: "Guest Arrival & Welcome", image: "/TimelineImage/arrivalimage.png" },
  { time: "4:30 PM", event: "Ceremony Begins", image: "/TimelineImage/WeddingCeremony.png" },
  { time: "5:30 PM", event: "Cocktail Hour & Fellowship", image: "/TimelineImage/Cocktail2.png" },
  { time: "6:30 PM", event: "Dinner & Celebration", image: "/TimelineImage/DinnerTime.png" },
  { time: "8:00 PM", event: "Closing Blessings & Fond Farewell", image: "/TimelineImage/ext.png"  },
]

export function WeddingTimeline() {
  return (
    <section
      id="timeline"
      className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden bg-transparent"
    >
      {/* Section Header - same as Entourage */}
      <div className="relative z-10 text-center mb-6 sm:mb-10 md:mb-12 px-3 sm:px-4 md:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal text-zinc-100 mb-3 sm:mb-4 md:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em]">
          Wedding Program Flow
        </h2>

        <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-zinc-400 font-light max-w-xl mx-auto leading-relaxed tracking-wide px-2 sm:px-4">
          Join us throughout the day
        </p>
      </div>

      {/* Central Card Container - same dark card as Entourage */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="relative group">
          <div
            className="relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #050505 100%)",
              boxShadow:
                "0 0 0 1px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.6), 0 30px 90px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#050505] z-0" />
            <div
              className="absolute inset-0 opacity-60 z-0"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(255,255,255,0.02) 0%, transparent 70%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[rgba(255,255,255,0.01)] to-transparent opacity-50 z-0" />

            {/* Elegant border */}
            <div
              className="absolute inset-0 rounded-xl sm:rounded-2xl z-0"
              style={{
                padding: "1px",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <div className="absolute inset-[1px] rounded-xl sm:rounded-2xl border border-[rgba(255,255,255,0.08)] group-hover:border-[rgba(255,255,255,0.15)] transition-colors z-0" />

            {/* Card content */}
            <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10">
              {/* Timeline Events */}
              <div className="relative">
                <div className="absolute left-8 sm:left-10 md:left-12 lg:left-16 xl:left-[4.5rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-zinc-500/20 via-zinc-500/30 to-zinc-500/20 hidden sm:block" />

                <div className="space-y-5 sm:space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12">
                  {timelineEvents.map((item, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
                        <div className="flex-shrink-0 relative z-10 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-36 xl:h-36">
                          {item.Icon ? (
                            <item.Icon className="w-full h-full text-zinc-300" />
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
                            <span className="inline-block text-[10px] sm:text-xs md:text-sm lg:text-base font-[family-name:var(--font-crimson)] font-semibold text-zinc-400 uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] bg-zinc-500/20 px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 rounded-full border border-zinc-500/30">
                              {item.time}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-[family-name:var(--font-crimson)] font-normal text-zinc-100 leading-tight">
                            {item.event}
                          </h3>
                        </div>
                      </div>

                      {index < timelineEvents.length - 1 && (
                        <div className="absolute left-8 top-20 sm:hidden w-0.5 h-6 bg-gradient-to-b from-zinc-500/20 to-zinc-500/30" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative divider - same as Entourage */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 my-8 sm:my-10 md:my-12 lg:my-16 xl:my-20">
                <div className="h-px w-12 sm:w-16 md:w-20 bg-zinc-500/40" />
                <div className="w-1.5 h-1.5 bg-zinc-500/50 rounded-full" />
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-zinc-500" fill="currentColor" />
                <div className="w-1.5 h-1.5 bg-zinc-500/50 rounded-full" />
                <div className="h-px w-12 sm:w-16 md:w-20 bg-zinc-500/40" />
              </div>

              {/* Thank you message - quote style */}
              <div className="relative rounded-lg sm:rounded-xl border border-[rgba(255,255,255,0.08)] bg-black/40 p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                <h4 className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] font-semibold text-zinc-200 mb-4 sm:mb-5 md:mb-6 text-center uppercase tracking-[0.12em]">
                  Thank you message
                </h4>
                <blockquote className="relative max-w-md mx-auto text-center">
                  <span className="absolute -left-1 -top-2 sm:-top-3 text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-ephesis)] text-zinc-500/60 leading-none select-none" aria-hidden>&ldquo;</span>
                  <div className="space-y-0.5 sm:space-y-1 font-[family-name:var(--font-crimson)] font-light text-zinc-100 text-sm sm:text-base md:text-lg leading-snug tracking-wide">
                    <p className="italic">With grateful hearts we give praise,</p>
                    <p className="italic">for God&apos;s love that lights our days.</p>
                    <p className="italic">Your presence is a blessing true,</p>
                    <p className="italic">a gift from Him, and from you, too.</p>
                  </div>
                  <span className="absolute -right-1 -bottom-2 sm:-bottom-3 text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-ephesis)] text-zinc-500/60 leading-none select-none" aria-hidden>&rdquo;</span>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
