"use client"

import React from "react"
import { useEffect, useMemo, useState } from "react"
import { Section } from "@/components/section"
import { Loader2, Users } from "lucide-react"

interface PrincipalSponsor {
  MalePrincipalSponsor: string
  FemalePrincipalSponsor: string
}

export function PrincipalSponsors() {
  // Helper component for name items with alignment
  const NameItem = ({ name, align = "center" }: { name: string, align?: "left" | "center" | "right" }) => {
    const containerAlign =
      align === "right" ? "items-end" : align === "left" ? "items-start" : "items-center"
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <div className={`flex flex-col ${containerAlign} justify-center py-0.5 sm:py-1 md:py-1.5 w-full`}>
        <p className={`text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-normal leading-tight sm:leading-snug break-words ${textAlign}`} style={{ color: "#7A4E2E" }}>{name}</p>
      </div>
    )
  }

  // Remote data state
  const [sponsors, setSponsors] = useState<PrincipalSponsor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSponsors = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/principal-sponsor", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to load principal sponsors")
      const data: PrincipalSponsor[] = await res.json()
      setSponsors(data)
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load principal sponsors")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSponsors()

    // Set up auto-refresh listener for dashboard updates
    const handleSponsorsUpdate = () => {
      setTimeout(() => {
        fetchSponsors()
      }, 1000)
    }

    window.addEventListener("sponsorsUpdated", handleSponsorsUpdate)

    return () => {
      window.removeEventListener("sponsorsUpdated", handleSponsorsUpdate)
    }
  }, [])

  // Only MalePrincipalSponsor category, for center display
  const maleSponsors = useMemo(() =>
    sponsors
      .map((s) => s.MalePrincipalSponsor?.trim())
      .filter((name): name is string => !!name),
    [sponsors]
  )

  return (
    <Section
      id="sponsors"
      className="relative py-8 sm:py-12 md:py-16 lg:py-20"
    >
      {/* Header */}
      <div className="relative z-10 text-center mb-6 sm:mb-10 md:mb-12 px-3 sm:px-4 md:px-6">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#A67C52] to-transparent" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal mb-3 sm:mb-4 md:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em]" style={{ color: "#F5E7D3" }}>
          Godparents of Marriage
        </h2>
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#A67C52] to-transparent" />
        </div>
        <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-normal max-w-2xl mx-auto leading-relaxed tracking-wide px-2 sm:px-4" style={{ color: "#F5E7D3" }}>
          With hearts full of gratitude, we honor our Godparents of Marriage, who will stand beside us as guiding figures, offering wisdom, prayers, and love as we begin this journey together.
        </p>
      </div>

      {/* Central Card Container — same as timeline/entourage */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="relative group">
          <div
            className="relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #FDF8F1 0%, #F5E7D3 40%, #FDF8F1 100%)",
              boxShadow: "0 0 0 1px rgba(166,124,82,0.22), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.7)",
            }}
          >
            <div className="absolute inset-0 opacity-50 z-0" style={{ background: "radial-gradient(circle at center, rgba(122,78,46,0.06) 0%, transparent 70%)" }} />
            <div
              className="absolute inset-0 rounded-xl sm:rounded-2xl z-0"
              style={{
                padding: "1px",
                background: "linear-gradient(135deg, rgba(122,78,46,0.22) 0%, rgba(166,124,82,0.18) 50%, rgba(122,78,46,0.18) 100%)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <div className="absolute inset-[1px] rounded-xl sm:rounded-2xl border border-[rgba(166,124,82,0.3)] z-0" />
            {/* Card content */}
            <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10">
              {isLoading ? (
                <div className="flex items-center justify-center py-12 sm:py-16 md:py-24">
                  <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 animate-spin" style={{ color: "#A67C52" }} />
                    <span className="font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg" style={{ color: "#A67C52" }}>
                      Loading sponsors...
                    </span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-12 sm:py-16 md:py-24">
                  <div className="text-center">
                    <p className="font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg mb-3 sm:mb-4" style={{ color: "#7A4E2E" }}>{error}</p>
                    <button
                      onClick={fetchSponsors}
                      className="font-[family-name:var(--font-crimson)] underline transition-colors duration-300 text-sm sm:text-base hover:opacity-90"
                      style={{ color: "#7A4E2E" }}
                    >
                      Try again
                    </button>
                  </div>
                </div>
              ) : maleSponsors.length === 0 ? (
                <div className="text-center py-12 sm:py-16 md:py-24">
                  <Users className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 mx-auto mb-3 sm:mb-4" style={{ color: "#A67C52" }} />
                  <p className="font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg" style={{ color: "#A67C52" }}>
                    No sponsors yet
                  </p>
                </div>
              ) : (
                <div className="mb-3 sm:mb-5 md:mb-7 lg:mb-9 flex justify-center">
                  <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 md:gap-2 max-w-sm">
                    {maleSponsors.map((name, idx) => (
                      <NameItem key={`male-${idx}-${name}`} name={name} align="center" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
