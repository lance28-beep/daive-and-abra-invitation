"use client"

import { Section } from "@/components/section"
import { Shirt, Copy, Check, Navigation, MapPin } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems(prev => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(itemId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const locationCity = "Paoay, Ilocos Norte, Philippines"

  const ceremonyVenueName = "St. Augustine Parish Church"
  const ceremonyVenueDetail = "Paoay, Ilocos Norte"
  const ceremonyAddress = "Paoay, Ilocos Norte"
  const ceremonyVenue = `${ceremonyVenueName}, ${ceremonyAddress}`
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(ceremonyVenue)}`

  const receptionVenueName = "Crescencia The Events Place"
  const receptionVenueDetail = "Young Street, Paoay Ilocos Norte"
  const receptionAddress = "Young Street, Paoay Ilocos Norte"
  const receptionVenue = `${receptionVenueName}, ${receptionAddress}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(receptionVenue)}`

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }


  return (
    <Section id="details" className="relative py-16 sm:py-20 md:py-24 lg:py-28">
      {/* Header */}
      <div className="relative z-10 text-center mb-10 sm:mb-14 md:mb-16 px-4 sm:px-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#A67C52] to-transparent" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-crimson)] font-normal mb-4 sm:mb-6 uppercase tracking-[0.12em] sm:tracking-[0.15em]" style={{ color: "#F5E7D3" }}>
          Event Details
        </h2>
        <p className="text-base sm:text-lg font-[family-name:var(--font-crimson)] font-normal max-w-xl mx-auto leading-relaxed tracking-wide px-4" style={{ color: "#F5E7D3" }}>
          Everything you need to know about our special day
        </p>
        {/* Date & location — JUNE 19, 2026 / Paoay, Ilocos Norte, Philippines */}
        <p className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-normal uppercase tracking-[0.15em] mt-6 sm:mt-8" style={{ color: "#F5E7D3" }}>
          June 19, 2026
        </p>
        <p className="text-sm sm:text-base font-[family-name:var(--font-crimson)] font-normal tracking-wide mt-2" style={{ color: "#F5E7D3" }}>
          {locationCity}
        </p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#A67C52] to-transparent" />
        </div>
      </div>

      {/* Venue and Event Information */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12 md:mb-16 space-y-6 sm:space-y-10 md:space-y-14">
        
        {/* Ceremony Card */}
        <div className="relative group">
          <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" style={{ background: "linear-gradient(135deg, rgba(122,78,46,0.14) 0%, transparent 60%)" }} />
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border transition-all duration-300" style={{ background: "linear-gradient(135deg, #FDF8F1 0%, #F5E7D3 40%, #FDF8F1 100%)", boxShadow: "0 0 0 1px rgba(166,124,82,0.22), 0 8px 24px rgba(0,0,0,0.12)", borderColor: "rgba(166,124,82,0.3)" }}>
            <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden">
              <Image
                src="/Details/THE%20PAOAY%20CHURCH.png"
                alt="St. Augustine Parish Church, Paoay"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 right-3 sm:right-4 md:right-6">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-normal uppercase tracking-[0.2em] mb-1 sm:mb-2 drop-shadow-lg" style={{ color: "#F5E7D3" }}>
                  The Ceremony
                </p>
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-normal drop-shadow-md uppercase tracking-[0.12em]" style={{ color: "#F5E7D3" }}>
                  St. Augustine Parish Church
                </p>
                <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] drop-shadow-md uppercase tracking-wide" style={{ color: "#F5E7D3" }}>
                  Paoay, Ilocos Norte
                </p>
              </div>
            </div>

            <div className="p-3 sm:p-5 md:p-7 lg:p-9">
              {/* Time — moved below image */}
              <div className="text-center mb-5 sm:mb-6">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-normal uppercase tracking-[0.15em]" style={{ color: "#7A4E2E" }}>
                  3:00 in the afternoon
                </p>
              </div>

              <div className="rounded-xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 border" style={{ background: "rgba(255,255,255,0.75)", borderColor: "rgba(166,124,82,0.25)" }}>
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mt-0.5 flex-shrink-0" style={{ color: "#7A4E2E" }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-normal uppercase tracking-wide mb-1.5 sm:mb-2" style={{ color: "#A67C52" }}>
                      Location
                    </p>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] font-normal leading-relaxed" style={{ color: "#7A4E2E" }}>
                      {ceremonyVenueName}
                    </p>
                    {ceremonyVenueDetail && (
                      <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] leading-relaxed mt-1" style={{ color: "#A67C52" }}>
                        {ceremonyVenueDetail}
                      </p>
                    )}

                  </div>
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <div className="p-1.5 sm:p-2 md:p-2.5 rounded-lg border shadow-sm" style={{ background: "#F5E7D3", borderColor: "rgba(166,124,82,0.45)" }}>
                      <QRCodeSVG
                        value={ceremonyMapsLink}
                        size={80}
                        level="M"
                        includeMargin={false}
                        fgColor="#7A4E2E"
                        bgColor="#F5E7D3"
                      />
                    </div>
                    <p className="text-[9px] sm:text-[10px] md:text-xs font-[family-name:var(--font-crimson)] italic text-center max-w-[80px]" style={{ color: "#A67C52" }}>
                      Scan for directions
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                <button
                  onClick={() => openInMaps(ceremonyMapsLink)}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 rounded-lg font-[family-name:var(--font-crimson)] font-normal text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundColor: "#7A4E2E", color: "#F5E7D3", border: "1px solid rgba(166,124,82,0.6)" }}
                  aria-label="Get directions to ceremony venue"
                >
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span>Get Directions</span>
                </button>
                <button
                  onClick={() => copyToClipboard(ceremonyVenue, 'ceremony')}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 rounded-lg font-[family-name:var(--font-crimson)] font-normal text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundColor: "transparent", color: "#7A4E2E", border: "1px solid rgba(166,124,82,0.6)" }}
                  aria-label="Copy ceremony venue address"
                >
                  {copiedItems.has('ceremony') ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" style={{ color: "#A67C52" }} />
                  ) : (
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  )}
                  <span>{copiedItems.has('ceremony') ? 'Copied!' : 'Copy Address'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reception Card */}
        <div className="relative group">
          <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" style={{ background: "linear-gradient(135deg, rgba(122,78,46,0.14) 0%, transparent 60%)" }} />
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border transition-all duration-300" style={{ background: "linear-gradient(135deg, #FDF8F1 0%, #F5E7D3 40%, #FDF8F1 100%)", boxShadow: "0 0 0 1px rgba(166,124,82,0.22), 0 8px 24px rgba(0,0,0,0.12)", borderColor: "rgba(166,124,82,0.3)" }}>
            <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden">
              <Image
                src="/Details/Crescencia%20The%20Events%20Place.jpg"
                alt="Crescencia The Events Place, Paoay"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 right-3 sm:right-4 md:right-6">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-normal uppercase tracking-[0.2em] mb-1 sm:mb-2 drop-shadow-lg" style={{ color: "#F5E7D3" }}>
                  The Reception
                </p>
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-normal drop-shadow-md uppercase tracking-[0.12em]" style={{ color: "#F5E7D3" }}>
                  Crescencia The Events Place
                </p>
                <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] drop-shadow-md uppercase tracking-wide" style={{ color: "#F5E7D3" }}>
                  Young Street, Paoay Ilocos Norte
                </p>
              </div>
            </div>

            <div className="p-3 sm:p-5 md:p-7 lg:p-9">
              {/* Time — moved below image */}
              <div className="text-center mb-5 sm:mb-6">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-normal uppercase tracking-[0.15em]" style={{ color: "#7A4E2E" }}>
                  5:30 in the afternoon
                </p>
              </div>

              <div className="rounded-xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 border" style={{ background: "rgba(255,255,255,0.75)", borderColor: "rgba(166,124,82,0.25)" }}>
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mt-0.5 flex-shrink-0" style={{ color: "#7A4E2E" }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-normal uppercase tracking-wide mb-1.5 sm:mb-2" style={{ color: "#A67C52" }}>
                      Location
                    </p>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] font-normal leading-relaxed" style={{ color: "#7A4E2E" }}>
                      {receptionVenueName}
                    </p>
                    {receptionVenueDetail && (
                      <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] leading-relaxed mt-1" style={{ color: "#A67C52" }}>
                        {receptionVenueDetail}
                      </p>
                    )}
         
                  </div>
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <div className="p-1.5 sm:p-2 md:p-2.5 rounded-lg border shadow-sm" style={{ background: "#F5E7D3", borderColor: "rgba(166,124,82,0.45)" }}>
                      <QRCodeSVG
                        value={receptionMapsLink}
                        size={80}
                        level="M"
                        includeMargin={false}
                        fgColor="#7A4E2E"
                        bgColor="#F5E7D3"
                      />
                    </div>
                    <p className="text-[9px] sm:text-[10px] md:text-xs font-[family-name:var(--font-crimson)] italic text-center max-w-[80px]" style={{ color: "#A67C52" }}>
                      Scan for directions
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                <button
                  onClick={() => openInMaps(receptionMapsLink)}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 rounded-lg font-[family-name:var(--font-crimson)] font-normal text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundColor: "#7A4E2E", color: "#F5E7D3", border: "1px solid rgba(166,124,82,0.6)" }}
                  aria-label="Get directions to reception venue"
                >
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span>Get Directions</span>
                </button>
                <button
                  onClick={() => copyToClipboard(receptionVenue, 'reception')}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 rounded-lg font-[family-name:var(--font-crimson)] font-normal text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundColor: "transparent", color: "#7A4E2E", border: "1px solid rgba(166,124,82,0.6)" }}
                  aria-label="Copy reception venue address"
                >
                  {copiedItems.has('reception') ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" style={{ color: "#A67C52" }} />
                  ) : (
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  )}
                  <span>{copiedItems.has('reception') ? 'Copied!' : 'Copy Address'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attire Information */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div className="h-px w-10 sm:w-14 md:w-20 bg-[#A67C52]/60" />
            <Shirt className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "#F5E7D3" }} />
            <div className="h-px w-10 sm:w-14 md:w-20 bg-[#A67C52]/60" />
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-[family-name:var(--font-crimson)] font-normal mb-3 sm:mb-4 uppercase tracking-[0.12em]" style={{ color: "#F5E7D3" }}>
            Attire Guidelines
          </h3>
          <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-normal" style={{ color: "#F5E7D3" }}>
            Please dress according to the guidelines below
          </p>
        </div>

        <div className="space-y-5 sm:space-y-6 md:space-y-8">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" style={{ background: "linear-gradient(135deg, rgba(122,78,46,0.12) 0%, transparent 60%)" }} />
            <div className="relative rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-9 border shadow-lg hover:shadow-xl transition-all duration-300" style={{ background: "rgba(255,255,255,0.8)", borderColor: "rgba(166,124,82,0.35)" }}>
              <h4 className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-normal mb-4 sm:mb-5 uppercase tracking-[0.12em] text-center" style={{ color: "#7A4E2E" }}>
                Attire Guide : Formal
              </h4>
              <p className="text-center text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-normal leading-relaxed mb-4 sm:mb-6 max-w-xl mx-auto" style={{ color: "#7A4E2E" }}>
                Kindly coordinate with our wedding palette. We would be honored to have your timeless elegance grace our celebration.
              </p>

              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
                <div className="h-px w-8 sm:w-12 bg-[#A67C52]/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#A67C52]" />
                <div className="h-px w-8 sm:w-12 bg-[#A67C52]/50" />
              </div>
              <p className="text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-normal uppercase tracking-wider text-center mb-4" style={{ color: "#7A4E2E" }}>
                Wedding palette
              </p>
              <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
                {[
                  { hex: "#C45508" },
                  { hex: "#643403" },
                  { hex: "#A27131" },
                  { hex: "#D6A96F" },
                ].map(({ hex }) => (
                  <div
                    key={hex}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg border-2 border-white/20 hover:scale-110 transition-all duration-300"
                    style={{ backgroundColor: hex }}
                    title={hex}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}