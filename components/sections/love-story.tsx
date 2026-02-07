 "use client"

import { Section } from "@/components/section"

export function LoveStory() {
  const paragraphs = [
    "Japoi and Regine’s journey began in 2014, when they met at one of their first companies. Japoi was the trainer, guiding a class of fresh faces, and among them was Regine - new to the industry, eager to learn. Their story didn’t begin with romance right away, but with lighthearted interactions and sweet exchanges that slowly revealed their affection for one another. Soon, they began spending time together, getting to know each other more deeply. On October 8, they made their relationship official.",
    "Their love story wasn’t built on a perfect foundation at first. Life tested them early, as they became young parents to their first daughter, Yaffa, in 2015. It was both a challenge and one of the most magical blessings of their lives. Parenthood became their strength, and just a year later, they welcomed their second daughter, Callie. Raising Callie, who was born with autism, brought new challenges, but also profound lessons in love, patience, and resilience. With the support of their families, friends, and church community, they stood firm together.",
    "Now, after 11 years of shared joys and trials, Japoi and Regine are ready to honor the love story that began all those years ago. With God at the center, they embrace marriage not just as a union of two hearts, but as a covenant of faith: anchored in grace, strengthened by challenges, and enriched by the family they’ve built together. Their love story continues - stronger, deeper, and more enduring than ever.",
  ]

  return (
    <Section
      id="love-story"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-crimson)] font-normal text-zinc-100 mb-3 sm:mb-4 tracking-[0.16em] sm:tracking-[0.2em] uppercase">
          A Love Story Anchored in Grace
        </h2>
        <p className="text-center text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] text-zinc-400 font-light mb-6 sm:mb-8 leading-relaxed tracking-wide">
          A story of grace, resilience, and a love strengthened through every season.
        </p>

        {/* Subtle divider between header and story */}
        <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10 md:mb-12">
          <span className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-zinc-600" />
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-500/60" />
          <span className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-zinc-600" />
        </div>

        <div className="max-w-2xl mx-auto space-y-6 sm:space-y-7 md:space-y-8">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-[13px] sm:text-sm md:text-base leading-loose sm:leading-loose text-zinc-300 font-[family-name:var(--font-crimson)] text-pretty font-light text-center tracking-[0.02em]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  )
}

