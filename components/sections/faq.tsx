"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/section";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "When should I RSVP by?",
    answer:
      "To help us with our planning, please RSVP as soon as possible. Kindly confirm your attendance no later than May 19, 2026. If we do not receive your response by this date, we will regretfully mark you as 'NO' and will not be able to accomodate late confirmations. Our final guest list will be submitted to our coordinator. -heartfelt"
  },
      {
    question: "When should I arrive?",
    answer:
    " We kindly encourage everyone to arrive before 3:00 PM to ensure that all guests are seated before the ceremony begins. We would truly appreciate your presence at the ceremony as we exchange our vows and begin our life together."
  },
  {
    question: "Plugged in ceremony",
    answer:
      "Capture the love using your phones and cameras, and share these special moment with us through the QR code included in this invitation.",
  },
  {
    question: "Is there a dress code?",
    answer:
      "We kindly request that guests wear formal attiree. Please refrain from wearing T-shirts, jeans, or slippers. Thank you for dressing up and celebrating with use!",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "As much ass possible, we kindly ask that only the guests listed on the invitation attend. However, if you would like to bring a plus one, please let us know and we'll be happy to share our thoughts.",
  },
  {
    question: "Can we bring our kids?",
    answer:
      "While we love your little ones, only children from our immediate family will be attending. We encourage our guests to enjoy the celebration as a special time for themselves.",
  },
  {
    question: "What time can we go home?",
    answer:
      "It took us more than a year of saving and planning to prepare this special day, and we truly hope everyone enjoys it. The program is expected to end at 9:00 PM, and we would be so grateful if you could stays and celebrate with us until the very end. Your presence means the world to us.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section
      id="faq"
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6">
        <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
          <div className="h-[1px] w-16 sm:w-24" style={{ background: "linear-gradient(to right, transparent, #A67C52, transparent)" }} />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal mb-4 sm:mb-6 uppercase tracking-[0.12em] sm:tracking-[0.15em]" style={{ color: "#F5E7D3" }}>
          Frequently Asked Questions
        </h2>
        <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
          <div className="h-[1px] w-16 sm:w-24" style={{ background: "linear-gradient(to right, transparent, #A67C52, transparent)" }} />
        </div>
        <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-light max-w-xl mx-auto leading-relaxed tracking-wide px-4" style={{ color: "#F5E7D3" }}>
          Everything you need to know
        </p>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="relative group">
          <div
            className="relative rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-300 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #FDF8F1 0%, #F5E7D3 40%, #FDF8F1 100%)",
              boxShadow: "0 0 0 1px rgba(166,124,82,0.22), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.7)",
            }}
          >
            <div className="absolute inset-0 opacity-50 rounded-xl sm:rounded-2xl z-0" style={{ background: "radial-gradient(circle at center, rgba(122,78,46,0.06) 0%, transparent 70%)" }} />
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl z-0" style={{ border: "1px solid rgba(166,124,82,0.3)" }} />

            <div className="relative z-10 space-y-2.5 sm:space-y-3 md:space-y-4">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index;
                const contentId = `faq-item-${index}`;
                return (
                  <div
                    key={index}
                    className="rounded-lg sm:rounded-xl border transition-all duration-300 overflow-hidden"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.8)",
                      borderColor: "rgba(166,124,82,0.35)",
                    }}
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group/btn w-full px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 md:py-4 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#A2976A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#45301F] transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span className="font-[family-name:var(--font-crimson)] font-normal pr-3 sm:pr-4 text-xs sm:text-sm md:text-base leading-relaxed transition-colors duration-200" style={{ color: "#7A4E2E" }}>
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={"flex-shrink-0 transition-transform duration-300 w-4 h-4 sm:w-5 sm:h-5 " + (isOpen ? "rotate-180" : "")}
                        style={{ color: "#A67C52" }}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={contentId}
                      role="region"
                      className={"grid transition-all duration-300 ease-out " + (isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
                    >
                      <div className="overflow-hidden">
                        <div className="px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 border-t" style={{ borderColor: "rgba(166,124,82,0.25)", backgroundColor: "rgba(245,231,211,0.7)" }}>
                          <p className="leading-relaxed text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] whitespace-pre-line" style={{ color: "#7A4E2E" }}>
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
