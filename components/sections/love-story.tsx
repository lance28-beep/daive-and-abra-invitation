 "use client"

import { Section } from "@/components/section"

export function LoveStory() {
  const paragraphs = [
    "Daive and Abra’s story began with a simple Facebook connection sometime between 2018 and 2019. What started as casual chats quickly turned into a beautiful friendship, filled with shared stories, late-night talks, and constant support through life’s ups and downs.",
    "Along the way, they discovered a shared sense of humor, a deep understanding of each other, and a love for life’s simple joys. In a loud and busy world, they found comfort, warmth, and a safe space in one another.",
    "Built on mutual respect, genuine care, and lots of laughter, their love continues to grow with every adventure they take together. Today, they’re excited to celebrate this special moment with you—grateful for the journey that brought them here and excited for all the adventures still ahead.",
  ]

  return (
    <Section id="love-story" className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
      {/* Light background matching hero */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg, #F5E7D3 0%, #FDF8F1 40%, #F5E7D3 100%)",
        }}
      />
      {/* Subtle radial gradients for depth */}
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background: "radial-gradient(circle at center, rgba(122,78,46,0.06) 0%, transparent 72%)",
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-45"
        style={{
          background: "radial-gradient(ellipse 90% 50% at 50% 18%, rgba(255,255,255,0.85) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-35"
        style={{
          background: "radial-gradient(ellipse 110% 70% at 50% 100%, rgba(166,124,82,0.12) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
        <h2
          className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal mb-3 sm:mb-4 tracking-[0.16em] sm:tracking-[0.2em] uppercase"
          style={{ color: "#7A4E2E" }}
        >
          Our Story
        </h2>
        <p
          className="text-center text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-normal mb-6 sm:mb-8 leading-relaxed tracking-wide"
          style={{ color: "#A67C52" }}
        >
          Every moment brings us closer to forever
        </p>

        <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10 md:mb-12">
          <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#A67C52] to-[#A67C52]" />
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#A67C52" }} />
          <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#A67C52] to-[#A67C52]" />
        </div>

        {/* Story paragraphs — no container */}
        <div className="max-w-2xl mx-auto space-y-6 sm:space-y-7 md:space-y-8">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-[13px] sm:text-sm md:text-base leading-loose text-pretty text-center tracking-[0.02em] font-[family-name:var(--font-crimson)] font-normal"
              style={{ color: "#7A4E2E" }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  )
}

