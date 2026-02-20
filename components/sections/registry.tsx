"use client";

import { Section } from "@/components/section";
import { Heart } from "lucide-react";

export function Registry() {
  return (
    <Section
      id="registry"
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal mb-4 sm:mb-6 uppercase tracking-[0.12em] sm:tracking-[0.15em]" style={{ color: "#F5D8B0" }}>
          Gift Guide
        </h2>
        <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-light max-w-xl mx-auto leading-relaxed tracking-wide px-4" style={{ color: "#A2976A" }}>
          Your presence is the greatest gift we could ask for
        </p>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="relative group">
          <div
            className="relative rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-14 transition-all duration-300 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #45301F 0%, #875F2C 40%, #45301F 100%)",
              boxShadow: "0 0 0 1px rgba(163,151,106,0.25), 0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(245,216,176,0.06)",
            }}
          >
            <div className="absolute inset-0 opacity-50 z-0 rounded-xl sm:rounded-2xl" style={{ background: "radial-gradient(circle at center, rgba(245,216,176,0.04) 0%, transparent 70%)" }} />
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl z-0" style={{ border: "1px solid rgba(163,151,106,0.3)" }} />

            <div className="relative z-10 flex flex-col items-center space-y-6 sm:space-y-8 md:space-y-10">
              <div className="p-2.5 sm:p-3 rounded-full shadow-lg border" style={{ backgroundColor: "rgba(163,151,106,0.4)", borderColor: "rgba(163,151,106,0.3)" }}>
                <Heart className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" style={{ color: "#F5D8B0" }} />
              </div>

              <div className="text-center max-w-2xl">
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                  <div className="h-px w-12 sm:w-16 md:w-20" style={{ backgroundColor: "rgba(163,151,106,0.4)" }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#A2976A" }} />
                  <div className="h-px w-12 sm:w-16 md:w-20" style={{ backgroundColor: "rgba(163,151,106,0.4)" }} />
                </div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-[family-name:var(--font-crimson)] font-light leading-relaxed tracking-wide" style={{ color: "#F5D8B0" }}>
                  Your presence is the greatest gift we could ask for. Should you wish to bless us as we embark on this journey together, a monetary gift would be greatly appreciated to help us start a new chapter in our married life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
