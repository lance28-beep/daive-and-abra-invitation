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
      "To help us with our planning, please RSVP to the event as soon as possible. However, the deadline is May 19, 2026. If we don't receive your RSVP by this date, we cannot make exceptions and will have to mark you as 'NO'. The official guest list will be given to our coordinator.",
  },
  {
    question: "When should I arrive?",
    answer:
      "We encourage everyone to arrive before 3:00 PM, before the ceremony starts to make sure everyone is seated on time. We appreciate that all guests can attend the ceremony to witness our union.",
  },
  {
    question: "Plugged in ceremony",
    answer:
      "Capture the love using your phones and cameras, and share these special moment with us through the QR code included in this invitation.",
  },
  {
    question: "Is there a dress code?",
    answer:
      "We kindly ask guests to wear formal attire. Please REFRAIN from wearing T-shirt, jeans, and slippers. Thank you for dressing up with us!",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "As much as possible, we kindly ask that only the guests that are listed in the invitation to attend. However, please let us know if you'd like to bring a plus one and we'll be happy to share our thoughts.",
  },
  {
    question: "Can we bring our kids?",
    answer:
      "Only children from our immediate family are only allowed. We encourage guests to enjoy the celebration as a special time for themselves.",
  },
  {
    question: "What time can we go home?",
    answer:
      "It took us more than a year to save and plan for our wedding so that everyone would (hopefully) enjoy. The program is estimated to end at 9:00 PM. PLEASE DON'T EAT AND RUN! Stay with us until the program ends.",
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
