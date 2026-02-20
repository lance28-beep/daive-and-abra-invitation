"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, MessageCircle, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageWallDisplayProps {
  messages: Message[]
  loading: boolean
}

export default function MessageWallDisplay({ messages, loading }: MessageWallDisplayProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (messages.length > 0) {
      setIsAnimating(true)
      // Stagger the animation of messages
      const timer = setTimeout(() => {
        setVisibleMessages(messages)
        setIsAnimating(false)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setVisibleMessages([])
    }
  }, [messages])

  if (loading) {
    return (
      <div className="space-y-3 sm:space-y-4 md:space-y-5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="relative rounded-lg overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #45301F 0%, #875F2C 40%, #45301F 100%)",
              boxShadow: "0 0 0 1px rgba(163,151,106,0.25), 0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(245,216,176,0.06)",
              border: "1px solid rgba(163,151,106,0.3)",
            }}
          >
            <div className="relative z-10 py-4 px-4 sm:py-5 sm:px-5 md:py-6 md:px-7">
              <Skeleton className="h-16 sm:h-20 md:h-24 w-full mb-3 sm:mb-4" style={{ backgroundColor: "rgba(69,48,31,0.5)" }} />
              <div className="flex items-center gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t" style={{ borderColor: "rgba(163,151,106,0.25)" }}>
                <Skeleton className="w-8 h-8 sm:w-9 sm:h-9 rounded-full" style={{ backgroundColor: "rgba(135,95,44,0.5)" }} />
                <div className="flex-1 space-y-1.5 sm:space-y-2">
                  <Skeleton className="h-3 sm:h-3.5 w-20 sm:w-24" style={{ backgroundColor: "rgba(69,48,31,0.5)" }} />
                  <Skeleton className="h-2.5 sm:h-3 w-16 sm:w-20" style={{ backgroundColor: "rgba(69,48,31,0.5)" }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto shadow-lg border mb-4 sm:mb-6" style={{ backgroundColor: "rgba(163,151,106,0.4)", borderColor: "rgba(163,151,106,0.3)" }}>
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: "#F5D8B0" }} />
        </div>
        <h3 className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] font-normal mb-2 sm:mb-3 uppercase tracking-wider" style={{ color: "#F5D8B0" }}>
          No Messages Yet
        </h3>
        <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-light max-w-md mx-auto leading-relaxed tracking-wide" style={{ color: "#A2976A" }}>
          Be the first to share your heartfelt wishes for the happy couple!
        </p>
        <div className="mt-4 sm:mt-6 flex justify-center">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" style={{ color: "#A2976A" }} />
            <span className="text-[10px] sm:text-xs font-[family-name:var(--font-crimson)]" style={{ color: "#A2976A" }}>Your message will appear here</span>
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" style={{ color: "#A2976A" }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5">
      {visibleMessages.map((msg, index) => (
        <div
          key={index}
          className={`relative transition-all duration-300 group rounded-lg overflow-hidden ${
            isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
            animation: isAnimating ? "none" : "fadeInUp 0.6s ease-out forwards",
            background: "linear-gradient(135deg, #45301F 0%, #875F2C 40%, #45301F 100%)",
            boxShadow: "0 0 0 1px rgba(163,151,106,0.25), 0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(245,216,176,0.06)",
            border: "1px solid rgba(163,151,106,0.3)",
          }}
        >
          <div className="relative z-10 py-4 px-4 sm:py-5 sm:px-6 md:py-6 md:px-7">
            <div className="relative mb-3 sm:mb-4 md:mb-5">
              <span className="absolute -left-2 -top-3 sm:-left-3 sm:-top-4 md:-left-4 md:-top-5 text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-crimson)] leading-none select-none transition-colors" style={{ color: "rgba(163,151,106,0.35)" }}>"</span>
              <div className="relative pl-6 sm:pl-8 md:pl-10 pr-4 sm:pr-6 md:pr-8 pt-2 sm:pt-3 pb-1.5 sm:pb-2">
                <p className="text-sm sm:text-base md:text-lg leading-relaxed font-[family-name:var(--font-crimson)] font-light tracking-wide" style={{ color: "rgba(245,216,176,0.95)" }}>{msg.message}</p>
              </div>
              <span className="absolute -right-2 -bottom-1 sm:-right-3 sm:-bottom-2 md:-right-4 md:-bottom-3 text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-crimson)] leading-none select-none transition-colors" style={{ color: "rgba(163,151,106,0.35)" }}>"</span>
            </div>

            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t" style={{ borderColor: "rgba(163,151,106,0.25)" }}>
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-sm transition-shadow border" style={{ backgroundColor: "rgba(135,95,44,0.6)", borderColor: "rgba(163,151,106,0.4)" }}>
                    <span className="font-[family-name:var(--font-crimson)] text-xs sm:text-sm font-normal" style={{ color: "#F5D8B0" }}>
                      {msg.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="font-[family-name:var(--font-crimson)] text-xs sm:text-sm md:text-base font-normal leading-tight" style={{ color: "#F5D8B0" }}>{msg.name}</h4>
                  <span className="text-[10px] sm:text-xs font-[family-name:var(--font-crimson)] tracking-wide" style={{ color: "#A2976A" }}>
                    {new Date(msg.timestamp).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </span>
                </div>
              </div>
              <Heart className="flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300" style={{ color: "#A2976A" }} fill="currentColor" />
            </div>
          </div>
        </div>
      ))}
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
