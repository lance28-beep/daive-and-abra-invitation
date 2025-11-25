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

  // Updated venue information
  const ceremonyVenueName = "Diocesan Shrine & Parish of Our Lady of the Abandoned"
  const ceremonyVenueDetail = ""
  const ceremonyAddress = "JP Rizal St., Sta. Elena, Marikina City"
  const ceremonyVenue = `${ceremonyVenueName}, ${ceremonyAddress}`
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(ceremonyVenue)}`

  const receptionVenueName = "The Grand Cobo Events Place"
  const receptionVenueDetail = ""
  const receptionAddress = "3 Mt. Kennedy St., Mountainview Village, Brgy. San Roque, Marikina City"
  const receptionVenue = `${receptionVenueName}, ${receptionAddress}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(receptionVenue)}`

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }


  return (
    <Section id="details" className="relative py-16 sm:py-20 md:py-24 lg:py-28">
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-[#688277]/40 to-white/60 backdrop-blur-sm pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#9F8650] to-transparent" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-crimson)] font-normal text-[#0A3629] mb-6 sm:mb-8 uppercase tracking-[0.12em] sm:tracking-[0.15em] elegant-text-shadow">
          Event Details
        </h2>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#9F8650] to-transparent" />
        </div>
        <p className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] text-[#0A3629]/80 font-light max-w-xl mx-auto leading-relaxed tracking-wide px-4">
          Everything you need to know about our special day
        </p>
      </div>

      {/* Venue and Event Information */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12 md:mb-16 space-y-6 sm:space-y-10 md:space-y-14">
        
        {/* Ceremony Card */}
        <div className="relative group">
          {/* Subtle earth tone glow on hover */}
          <div className="absolute -inset-1 bg-gradient-to-br from-[#9F8650]/20 to-[#688277]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
          
          {/* Main card */}
          <div className="relative elegant-card rounded-xl sm:rounded-2xl overflow-hidden border border-[#9F8650]/30 premium-shadow hover:border-[#9F8650]/50 transition-all duration-300">
            {/* Venue Image */}
            <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden">
              <Image
                src="/Details/DiocesanShrine.png"
                alt="Diocesan Shrine & Parish of Our Lady of the Abandoned"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Venue name overlay with warm gold accent */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 right-3 sm:right-4 md:right-6">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-ephesis)] text-[#9F8650] mb-1 sm:mb-2 drop-shadow-lg">
                  Ceremony
                </p>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-crimson)] font-normal text-white mb-0.5 sm:mb-1 drop-shadow-lg uppercase tracking-[0.1em] leading-tight">
                  Diocesan Shrine & Parish
                </h3>
                <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] text-white/95 drop-shadow-md tracking-wide">
                  Of Our Lady of the Abandoned
                </p>
              </div>
            </div>

            {/* Event Details Content */}
            <div className="p-3 sm:p-5 md:p-7 lg:p-9">
              {/* Date Section */}
              <div className="text-center mb-5 sm:mb-8 md:mb-10">
                {/* Day name */}
                <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-semibold text-[#0A3629] uppercase tracking-[0.2em] mb-2 sm:mb-3">
                  Saturday
                </p>
                
                {/* Month - Script style with warm gold */}
                <div className="mb-2 sm:mb-4">
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-ephesis)] text-[#0A3629] leading-none">
                    January
                  </p>
                </div>
                
                {/* Day and Year */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-7">
                  <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-crimson)] font-normal text-[#0A3629] leading-none elegant-text-shadow">
                    24
                  </p>
                  <div className="h-10 sm:h-12 md:h-16 lg:h-20 w-[2px] bg-gradient-to-b from-[#9F8650] via-[#688277] to-[#9F8650]" />
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-light text-[#0A3629] leading-none">
                    2026
                  </p>
                </div>

                {/* Decorative line */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="h-[1px] w-8 sm:w-10 md:w-14 bg-gradient-to-r from-transparent via-[#9F8650] to-[#9F8650]" />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#9F8650] rounded-full" />
                  <div className="h-[1px] w-8 sm:w-10 md:w-14 bg-gradient-to-l from-transparent via-[#9F8650] to-[#9F8650]" />
                </div>

                {/* Time */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)] font-semibold text-[#0A3629] tracking-wide">
                  9:30 AM
                </p>
              </div>

              {/* Location Details */}
              <div className="bg-gradient-to-br from-[#F9F8F4]/40 to-white rounded-xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 border border-[#9F8650]/20">
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#9F8650] mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-semibold text-[#9F8650] mb-1.5 sm:mb-2 uppercase tracking-wide">
                      Location
                    </p>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] text-[#0A3629] leading-relaxed">
                      {ceremonyVenueName}
                    </p>
                    {ceremonyVenueDetail && (
                      <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-[#0A3629]/70 leading-relaxed mt-1">
                        {ceremonyVenueDetail}
                      </p>
                    )}
                    <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-[#0A3629]/70 leading-relaxed">
                      {ceremonyAddress}
                    </p>
                  </div>
                  {/* QR Code for Ceremony - Right side */}
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <div className="bg-white p-1.5 sm:p-2 md:p-2.5 rounded-lg border border-[#9F8650]/20 shadow-sm">
                      <QRCodeSVG
                        value={ceremonyMapsLink}
                        size={80}
                        level="M"
                        includeMargin={false}
                        fgColor="#0A3629"
                        bgColor="#FFFFFF"
                      />
                    </div>
                    <p className="text-[9px] sm:text-[10px] md:text-xs font-[family-name:var(--font-crimson)] text-[#0A3629]/60 italic text-center max-w-[80px]">
                      Scan for directions
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                <button
                  onClick={() => openInMaps(ceremonyMapsLink)}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-[#0A3629] to-[#126555] hover:from-[#126555] hover:to-[#0A3629] text-white rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] premium-shadow"
                  aria-label="Get directions to ceremony venue"
                >
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span>Get Directions</span>
                </button>
                <button
                  onClick={() => copyToClipboard(ceremonyVenue, 'ceremony')}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-white border-2 border-[#9F8650]/30 hover:border-[#9F8650]/50 hover:bg-[#F9F8F4]/20 text-[#0A3629] rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  aria-label="Copy ceremony venue address"
                >
                  {copiedItems.has('ceremony') ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 text-[#9F8650]" />
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
          {/* Subtle earth tone glow on hover */}
          <div className="absolute -inset-1 bg-gradient-to-br from-[#9F8650]/20 to-[#688277]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
          
          {/* Main card */}
          <div className="relative elegant-card rounded-xl sm:rounded-2xl overflow-hidden border border-[#9F8650]/30 premium-shadow hover:border-[#9F8650]/50 transition-all duration-300">
            {/* Venue Image */}
            <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden">
              <Image
                src="/Details/TheGrandCobo.png"
                alt="The Grand Cobo Events Place"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Venue name overlay with warm gold accent */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 right-3 sm:right-4 md:right-6">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-ephesis)] text-[#9F8650] mb-1 sm:mb-2 drop-shadow-lg">
                  Reception
                </p>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-crimson)] font-normal text-white mb-0.5 sm:mb-1 drop-shadow-lg uppercase tracking-[0.1em] leading-tight">
                  The Grand Cobo
                </h3>
                <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] text-white/95 drop-shadow-md tracking-wide">
                  Events Place
                </p>
              </div>
            </div>

            {/* Event Details Content */}
            <div className="p-3 sm:p-5 md:p-7 lg:p-9">
              {/* Time */}
              <div className="text-center mb-5 sm:mb-8">
                <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-semibold text-[#0A3629] uppercase tracking-[0.2em] mb-2 sm:mb-3">
                  Starts at
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)] font-semibold text-[#0A3629] tracking-wide">
                  11:00 AM
                </p>
              </div>

              {/* Location Details */}
              <div className="bg-gradient-to-br from-[#F9F8F4]/40 to-white rounded-xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 border border-[#9F8650]/20">
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#9F8650] mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-semibold text-[#9F8650] mb-1.5 sm:mb-2 uppercase tracking-wide">
                      Location
                    </p>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] text-[#0A3629] leading-relaxed">
                      {receptionVenueName}
                    </p>
                    {receptionVenueDetail && (
                      <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-[#0A3629]/70 leading-relaxed mt-1">
                        {receptionVenueDetail}
                      </p>
                    )}
                    <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-[#0A3629]/70 leading-relaxed">
                      {receptionAddress}
                    </p>
                  </div>
                  {/* QR Code for Reception - Right side */}
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <div className="bg-white p-1.5 sm:p-2 md:p-2.5 rounded-lg border border-[#9F8650]/20 shadow-sm">
                      <QRCodeSVG
                        value={receptionMapsLink}
                        size={80}
                        level="M"
                        includeMargin={false}
                        fgColor="#0A3629"
                        bgColor="#FFFFFF"
                      />
                    </div>
                    <p className="text-[9px] sm:text-[10px] md:text-xs font-[family-name:var(--font-crimson)] text-[#0A3629]/60 italic text-center max-w-[80px]">
                      Scan for directions
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                <button
                  onClick={() => openInMaps(receptionMapsLink)}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-[#0A3629] to-[#126555] hover:from-[#126555] hover:to-[#0A3629] text-white rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] premium-shadow"
                  aria-label="Get directions to reception venue"
                >
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span>Get Directions</span>
                </button>
                <button
                  onClick={() => copyToClipboard(receptionVenue, 'reception')}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-white border-2 border-[#9F8650]/30 hover:border-[#9F8650]/50 hover:bg-[#F9F8F4]/20 text-[#0A3629] rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  aria-label="Copy reception venue address"
                >
                  {copiedItems.has('reception') ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 text-[#9F8650]" />
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
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div className="h-px w-10 sm:w-14 md:w-20 bg-white/50" />
            <Shirt className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <div className="h-px w-10 sm:w-14 md:w-20 bg-white/50" />
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-[family-name:var(--font-crimson)] font-normal text-white mb-3 sm:mb-4 uppercase tracking-[0.12em]">
            Attire Guidelines
          </h3>
          <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-white font-light">
            Please dress according to the guidelines below
          </p>
        </div>

        {/* Attire Cards */}
        <div className="space-y-5 sm:space-y-6 md:space-y-8">
          {/* Guest Attire */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-[#9F8650]/15 to-[#688277]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
            
            <div className="relative bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-9 border-2 border-[#9F8650]/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <h4 className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-semibold text-[#0A3629] mb-6 sm:mb-7 md:mb-8 uppercase tracking-[0.12em] text-center">
                Guest Attire
              </h4>
              
              {/* Guest Dress Code Text */}
              <div className="text-center mb-7 sm:mb-8 md:mb-10">
                <p className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] text-[#0A3629] leading-relaxed mb-4">
                  <span className="font-semibold">Ladies:</span> Long gowns in earth tones (no prints, please)
                </p>
                <p className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] text-[#0A3629] leading-relaxed">
                  <span className="font-semibold">Gentlemen:</span> Barong Tagalog & black slacks or formal wear
                </p>
              </div>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-7">
                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#9F8650]/40" />
                <div className="w-1.5 h-1.5 bg-[#9F8650]/50 rounded-full" />
                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#9F8650]/40" />
              </div>
              
              {/* Color Palette - Earth Tones */}
              <div className="text-center bg-gradient-to-br from-[#9F8650]/5 via-transparent to-[#9F8650]/5 rounded-xl p-5 sm:p-6 md:p-7">
                <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-semibold text-[#0A3629] uppercase tracking-wider mb-4 sm:mb-5">
                  Color Palette - Earth Tones & Natural Elegance
                </p>
                <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
                  <div className="flex flex-col items-center gap-2 sm:gap-2.5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg border-3 border-white bg-[#A0826D] hover:scale-110 hover:shadow-xl transition-all duration-300 ring-2 ring-[#A0826D]/20" />
                    <span className="text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-medium text-[#0A3629]/70">Taupe</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 sm:gap-2.5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg border-3 border-white bg-[#E3D5C8] hover:scale-110 hover:shadow-xl transition-all duration-300 ring-2 ring-[#E3D5C8]/20" />
                    <span className="text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-medium text-[#0A3629]/70">Nude</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 sm:gap-2.5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg border-3 border-white bg-[#C3B091] hover:scale-110 hover:shadow-xl transition-all duration-300 ring-2 ring-[#C3B091]/20" />
                    <span className="text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-medium text-[#0A3629]/70">Khaki</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 sm:gap-2.5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg border-3 border-white bg-[#8B6F47] hover:scale-110 hover:shadow-xl transition-all duration-300 ring-2 ring-[#8B6F47]/20" />
                    <span className="text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-medium text-[#0A3629]/70">Brown</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 sm:gap-2.5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg border-3 border-white bg-[#9F8650] hover:scale-110 hover:shadow-xl transition-all duration-300 ring-2 ring-[#9F8650]/20" />
                    <span className="text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-medium text-[#0A3629]/70">Warm Gold</span>
                  </div>
                </div>
                <p className="mt-5 text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] text-[#0A3629]/80 leading-relaxed">
                  We kindly request guests to wear earth tones. Please avoid printed outfits.
                </p>
              </div>
            </div>
          </div>

          {/* Principal Sponsors Attire */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-[#9F8650]/15 to-[#688277]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
            
            <div className="relative bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-9 border-2 border-[#9F8650]/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <h4 className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-semibold text-[#0A3629] mb-6 sm:mb-7 md:mb-8 uppercase tracking-[0.12em] text-center">
                Principal Sponsors' Attire
              </h4>
              
              {/* Sponsors Dress Code Text */}
              <div className="text-center">
                <p className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] text-[#0A3629] leading-relaxed mb-4">
                  <span className="font-semibold">Ninangs:</span> Champagne or Gold long gowns
                </p>
                <p className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] text-[#0A3629] leading-relaxed">
                  <span className="font-semibold">Ninongs:</span> Barong Tagalog & Black Slacks
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Reminders Section */}
        <div className="relative group mt-10 sm:mt-14 md:mt-16">
          <div className="absolute -inset-1 bg-gradient-to-br from-[#9F8650]/15 to-[#688277]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
          
          <div className="relative bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-9 border-2 border-[#9F8650]/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <h4 className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-semibold text-[#0A3629] mb-6 sm:mb-7 md:mb-8 uppercase tracking-[0.12em] text-center">
              Important Reminders
            </h4>
            
            {/* Reminders List */}
            <div className="space-y-5 sm:space-y-6 md:space-y-7">
              {/* Attendance Limited */}
              <div className="bg-gradient-to-br from-[#F9F8F4]/30 via-[#F9F8F4]/20 to-white rounded-xl p-5 sm:p-6 md:p-7 border border-[#9F8650]/20">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#0A3629] leading-relaxed">
                  <span className="font-semibold">Invitation Only:</span> As we celebrate this moment with our closest loved ones, we kindly ask that attendance be limited to those named on the invitation.
                </p>
              </div>

              {/* No Boxed Gifts */}
              <div className="bg-gradient-to-br from-[#F9F8F4]/30 via-[#F9F8F4]/20 to-white rounded-xl p-5 sm:p-6 md:p-7 border border-[#9F8650]/20">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#0A3629] leading-relaxed">
                  <span className="font-semibold">Gift Policy:</span> We kindly ask for no boxed gifts. Monetary gifts are welcome but never expected.
                </p>
              </div>

              {/* Adults Only */}
              <div className="bg-gradient-to-br from-[#F9F8F4]/30 via-[#F9F8F4]/20 to-white rounded-xl p-5 sm:p-6 md:p-7 border border-[#9F8650]/20">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#0A3629] leading-relaxed">
                  <span className="font-semibold">Adults-Only Event:</span> We love your little ones, but to keep the celebration intimate, we kindly request an adults-only event. (Children in our family and the entourage are the exception)
                </p>
              </div>

              {/* No Photos */}
              <div className="bg-gradient-to-br from-[#F9F8F4]/30 via-[#F9F8F4]/20 to-white rounded-xl p-5 sm:p-6 md:p-7 border border-[#9F8650]/20">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#0A3629] leading-relaxed">
                  <span className="font-semibold">Photo Policy:</span> We'd love for everyone to be fully present. Please avoid posting photos during the celebration or ahead of time—our photographers will take care of the memories.
                </p>
              </div>

              {/* RSVP Contact */}
              <div className="bg-gradient-to-br from-[#F9F8F4]/30 via-[#F9F8F4]/20 to-white rounded-xl p-5 sm:p-6 md:p-7 border border-[#9F8650]/20">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#0A3629] leading-relaxed">
                  <span className="font-semibold">RSVP Contact:</span> Please reach out to Jay-R & Jen (contact information to be updated)
                </p>
              </div>
            </div>

            {/* Thank You Note */}
            <div className="mt-7 sm:mt-8 md:mt-9 pt-6 sm:pt-7 md:pt-8 border-t border-[#9F8650]/20">
              <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#0A3629] text-center leading-relaxed italic">
                Thank you for your understanding and cooperation. We look forward to celebrating with you!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

