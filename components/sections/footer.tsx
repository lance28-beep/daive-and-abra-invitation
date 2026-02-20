"use client";

import { motion } from "motion/react";

export function Footer() {
  const year = new Date().getFullYear();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const staggerChildren = {
    animate: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const dividerStyle = { background: "linear-gradient(to right, transparent, #A2976A, transparent)" };

  return (
    <footer
      className="relative z-20 mt-16 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #45301F 0%, #2a1f14 50%, #1a120a 100%)",
        boxShadow: "inset 0 1px 0 rgba(245,216,176,0.06)",
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16">
        <motion.div
          className="flex justify-center px-4 mb-16"
          variants={fadeInUp}
        >
          <div className="max-w-xl md:max-w-2xl w-full text-center">
            <div className="mb-8 sm:mb-9 md:mb-10 flex justify-center">
              <div
                className="h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72 [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]"
                style={{
                  maskImage: "url(/monogram/newmonogram.png)",
                  WebkitMaskImage: "url(/monogram/newmonogram.png)",
                  backgroundColor: "#F5D8B0",
                }}
                role="img"
                aria-label="Daive & Abra"
              />
            </div>

            <div className="mb-6 sm:mb-7 md:mb-8 flex justify-center">
              <div className="h-px w-24 sm:w-32 md:w-40" style={dividerStyle} />
            </div>

            <div className="mb-7 sm:mb-9 md:mb-10">
              <p className="text-[11px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] tracking-[0.38em] uppercase mb-4 sm:mb-5" style={{ color: "#A2976A" }}>
                June
              </p>
              <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-14 mb-3 sm:mb-4">
                <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] tracking-[0.3em] uppercase" style={{ color: "#A2976A" }}>
                  Friday
                </p>
                <p className="text-4xl sm:text-5xl md:text-[3.25rem] font-[family-name:var(--font-crimson)] leading-none" style={{ color: "#F5D8B0" }}>
                  19
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] tracking-[0.3em] uppercase" style={{ color: "#A2976A" }}>
                  2026
                </p>
              </div>
            </div>

            <div className="mt-6 sm:mt-7 md:mt-8 mb-6 sm:mb-7 flex justify-center">
              <div className="h-px w-24 sm:w-32 md:w-40" style={dividerStyle} />
            </div>

            {/* Ceremony */}
            <div className="space-y-1.5 sm:space-y-2 mb-8 sm:mb-10">
              <p className="text-[10px] sm:text-xs font-[family-name:var(--font-crimson)] tracking-[0.3em] uppercase" style={{ color: "#A2976A" }}>
                Ceremony · 3:00 PM
              </p>
              <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] tracking-[0.2em] uppercase" style={{ color: "#F5D8B0" }}>
                St. Augustine Parish Church
              </p>
              <p className="text-[10px] sm:text-xs font-[family-name:var(--font-crimson)] tracking-[0.16em] uppercase" style={{ color: "#A2976A" }}>
                Paoay, Ilocos Norte, Philippines
              </p>
            </div>

            <div className="mb-6 sm:mb-7 flex justify-center">
              <div className="h-px w-16 sm:w-20" style={dividerStyle} />
            </div>

            {/* Reception */}
            <div className="space-y-1.5 sm:space-y-2">
              <p className="text-[10px] sm:text-xs font-[family-name:var(--font-crimson)] tracking-[0.3em] uppercase" style={{ color: "#A2976A" }}>
                Reception · 5:30 PM
              </p>
              <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] tracking-[0.2em] uppercase" style={{ color: "#F5D8B0" }}>
                Crescencia The Events Place
              </p>
              <p className="text-[10px] sm:text-xs font-[family-name:var(--font-crimson)] tracking-[0.16em] uppercase" style={{ color: "#A2976A" }}>
                Young Street, Paoay, Ilocos Norte, Philippines
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center mb-12"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Couple Info – aligned with hero */}
          {/* <motion.div className="max-w-md" variants={fadeInUp}>
            <div className="mb-8">
              <div className="mb-6">
                <Image
                  src="/monogram/monogram.png"
                  alt="Japoi & Regine"
                  width={80}
                  height={80}
                  className="h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 object-contain object-center brightness-0 invert"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-crimson)] font-semibold text-zinc-100 uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-6">
              Japoi & Regine
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 font-[family-name:var(--font-crimson)] text-zinc-300 font-medium">
                  <Calendar className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                  <span className="text-base sm:text-lg">March 15, 2026 • Sunday</span>
                </div>
                <div className="flex items-center gap-3 font-[family-name:var(--font-crimson)] text-zinc-300 font-medium">
                  <MapPin className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Twin Lakes Tagaytay, Glass House • Tagaytay, Philippines</span>
                </div>
              </div>
            </div>
          </motion.div> */}
        </motion.div>

        {/* Bottom Row */}
        <motion.div
          className="pt-8 border-t"
          style={{ borderColor: "rgba(163,151,106,0.3)" }}
          variants={fadeInUp}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-[family-name:var(--font-crimson)] text-sm sm:text-base font-normal" style={{ color: "#F5D8B0" }}>
                © {year} Daive & Abra. All rights reserved.
              </p>
              <p className="font-[family-name:var(--font-crimson)] text-sm sm:text-base mt-1 font-normal" style={{ color: "#A2976A" }}>
                Made with 💕 for our wedding day
              </p>
            </div>

            <div className="text-center md:text-right space-y-1">
              <p className="font-[family-name:var(--font-crimson)] text-xs sm:text-sm font-normal" style={{ color: "#A2976A" }}>
                Developed by{" "}
                <a
                  href="https://lance28-beep.github.io/portfolio-website/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 underline font-normal hover:opacity-90"
                  style={{ color: "#F5D8B0", textDecorationColor: "rgba(163,151,106,0.6)" }}
                >
                  Lance Valle
                </a>
              </p>
              <p className="font-[family-name:var(--font-crimson)] text-xs sm:text-sm font-normal" style={{ color: "#A2976A" }}>
                Want a website like this? Visit{" "}
                <a
                  href="https://www.facebook.com/WeddingInvitationNaga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 underline font-normal hover:opacity-90"
                  style={{ color: "#F5D8B0", textDecorationColor: "rgba(163,151,106,0.6)" }}
                >
                  Wedding Invitation Naga
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}