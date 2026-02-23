"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  Mail,
  MessageSquare,
  Heart,
  Sparkles,
  User,
} from "lucide-react";
import { Section } from "@/components/section";

interface Guest {
  Name: string;
  Email: string;
  RSVP: string;
  Guest: string;
  Message: string;
}

export function BookOfGuests() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalGuests, setTotalGuests] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getInitials = (name: string) => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase()).join("") || "?";
  };

  const fetchGuests = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/guests", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Failed to fetch guest list");
      }

      const data: Guest[] = await response.json();

      // Filter only attending guests and normalize Guest field
      const attendingGuests = data
        .filter((guest) => guest.RSVP === "Yes")
        .map((guest) => ({
          ...guest,
          Guest: guest.Guest || "1", // Ensure Guest field exists
        }));

      // Calculate total guests by summing the Guest column values
      const totalGuestCount = attendingGuests.reduce((sum, guest) => {
        const guestCount = parseInt(String(guest.Guest)) || 1;
        return sum + guestCount;
      }, 0);

      setGuests(attendingGuests);
      setTotalGuests(totalGuestCount);
    } catch (error: any) {
      console.error("Failed to load guests:", error);
      setError(error?.message || "Failed to load guest list");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchGuests();

    // Set up event listener for RSVP updates
    const handleRsvpUpdate = () => {
      // Add a small delay to allow Google Sheets to update
      setTimeout(() => {
        fetchGuests();
      }, 2000);
    };

    window.addEventListener("rsvpUpdated", handleRsvpUpdate);

    return () => {
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate);
    };
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    if (guests.length <= 5) return; // No need to rotate if 5 or fewer guests

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 5;
          // If we've reached the end, loop back to start
          return nextIndex >= guests.length ? 0 : nextIndex;
        });
        setIsTransitioning(false);
      }, 600); // Half of transition duration
    }, 5000); // Change slides every 5 seconds

    return () => clearInterval(interval);
  }, [guests.length]);

  // Get visible guests (max 5)
  const getVisibleGuests = () => {
    if (guests.length <= 5) return guests;
    
    const visibleGuests = [];
    for (let i = 0; i < 5; i++) {
      const index = (currentIndex + i) % guests.length;
      visibleGuests.push(guests[index]);
    }
    return visibleGuests;
  };

  return (
    <Section id="guests" className="relative py-16 sm:py-20 md:py-24 lg:py-28">
      {/* Section Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal mb-4 sm:mb-6 uppercase tracking-[0.12em] sm:tracking-[0.15em]" style={{ color: "#F5E7D3" }}>
          Book of Guests
        </h2>

        <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-light max-w-xl mx-auto leading-relaxed tracking-wide px-4" style={{ color: "#F5E7D3" }}>
          See who's celebrating with us on our special day
        </p>
      </div>

      {/* Guests content */}
      <div className="relative z-10">
        {/* Stats card */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4 md:px-6">
          <div className="relative max-w-3xl mx-auto group">
            <div 
              className="relative rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #FDF8F1 0%, #F5E7D3 40%, #FDF8F1 100%)",
                boxShadow: "0 0 0 1px rgba(166,124,82,0.22), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.7)",
              }}
            >
              <div className="absolute inset-0 opacity-50 z-0 rounded-xl sm:rounded-2xl" style={{ background: "radial-gradient(circle at center, rgba(122,78,46,0.06) 0%, transparent 70%)" }} />
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl z-0" style={{ border: "1px solid rgba(166,124,82,0.3)" }} />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2.5 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-5">
                  <div className="p-1.5 sm:p-2 md:p-2.5 rounded-full shadow-lg border" style={{ backgroundColor: "rgba(122,78,46,0.1)", borderColor: "rgba(166,124,82,0.4)" }}>
                    <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" style={{ color: "#7A4E2E" }} />
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-[family-name:var(--font-crimson)] font-normal" style={{ color: "#7A4E2E" }}>
                      {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"}{" "}
                      Celebrating With Us
                    </h3>
                    <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] mt-0.5 sm:mt-1" style={{ color: "#A67C52" }}>
                      {guests.length}{" "}
                      {guests.length === 1 ? "RSVP entry" : "RSVP entries"}
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] leading-relaxed" style={{ color: "#7A4E2E" }}>
                  Thank you for confirming your RSVP! Your presence means the
                  world to us.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Guest list container */}
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="relative group">
            <div 
              className="relative rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-300 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #FDF8F1 0%, #F5E7D3 40%, #FDF8F1 100%)",
                boxShadow: "0 0 0 1px rgba(166,124,82,0.22), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.7)",
              }}
            >
              <div className="absolute inset-0 opacity-50 z-0 rounded-xl sm:rounded-2xl" style={{ background: "radial-gradient(circle at center, rgba(122,78,46,0.06) 0%, transparent 70%)" }} />
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl z-0" style={{ border: "1px solid rgba(166,124,82,0.3)" }} />
              
              <div className="relative z-10">
                {isLoading ? (
                  <div className="flex items-center justify-center py-16 sm:py-20 md:py-24">
                    <div className="flex flex-col items-center gap-3 sm:gap-4">
                      <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 animate-spin" style={{ color: "#A67C52" }} />
                      <span className="font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg" style={{ color: "#7A4E2E" }}>
                        Loading guests...
                      </span>
                    </div>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center py-16 sm:py-20 md:py-24">
                    <div className="text-center">
                      <MessageSquare className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4" style={{ color: "#A67C52" }} />
                      <p className="font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg mb-2" style={{ color: "#7A4E2E" }}>
                        {error}
                      </p>
                    </div>
                  </div>
                ) : guests.length === 0 ? (
                  <div className="flex items-center justify-center py-16 sm:py-20 md:py-24">
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 border" style={{ backgroundColor: "rgba(122,78,46,0.1)", borderColor: "rgba(166,124,82,0.4)" }}>
                        <Heart className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" style={{ color: "#7A4E2E" }} />
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-normal mb-2" style={{ color: "#7A4E2E" }}>
                        No guests have RSVP'd yet
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] max-w-md mx-auto leading-relaxed" style={{ color: "#A67C52" }}>
                        Be the first to RSVP and kick off the celebration!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 overflow-hidden">
                    {/* Carousel container with perspective for roll-up effect */}
                    <div
                      className="space-y-2.5 sm:space-y-3 md:space-y-4"
                      style={{ perspective: '1000px', perspectiveOrigin: 'center bottom' }}
                    >
                      {getVisibleGuests().map((guest, index) => (
                        <div
                          key={`${guest.Name}-${currentIndex}-${index}`}
                          className="group relative rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border transition-all duration-300 hover:shadow-lg animate-roll-up"
                          style={{
                            animationDelay: `${index * 120}ms`,
                            backfaceVisibility: "hidden",
                            backgroundColor: "rgba(255,255,255,0.95)",
                            borderColor: "rgba(166,124,82,0.35)",
                          }}
                        >
                          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4">
                            <div className="relative h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 flex-shrink-0">
                              <div className="h-full w-full rounded-full flex items-center justify-center font-[family-name:var(--font-crimson)] font-normal shadow-md text-xs sm:text-sm md:text-base border" style={{ backgroundColor: "rgba(245,231,211,0.95)", color: "#7A4E2E", borderColor: "rgba(166,124,82,0.45)" }}>
                                {getInitials(guest.Name)}
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                                <div className="flex-1 pr-12 sm:pr-0">
                                  <h4 className="font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg font-normal mb-0.5 sm:mb-1 transition-colors duration-200" style={{ color: "#7A4E2E" }}>
                                    {guest.Name}
                                  </h4>
                                  {guest.Email && guest.Email !== "Pending" && (
                                    <div className="flex items-center text-[10px] sm:text-xs md:text-sm" style={{ color: "#A67C52" }}>
                                      <Mail className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 mr-1 sm:mr-1.5 flex-shrink-0" style={{ color: "#A67C52" }} />
                                      <span className="font-[family-name:var(--font-crimson)] break-all">
                                        {guest.Email}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="absolute right-2.5 top-2.5 sm:static sm:right-auto sm:top-auto flex items-center gap-1 sm:gap-1.5">
                                  <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" style={{ color: "#A67C52" }} />
                                  <span className="inline-flex items-center justify-center px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-normal border" style={{ backgroundColor: "rgba(245,231,211,0.9)", color: "#7A4E2E", borderColor: "rgba(166,124,82,0.45)" }}>
                                    {guest.Guest
                                      ? parseInt(String(guest.Guest)) || 1
                                      : 1}{" "}
                                    {parseInt(String(guest.Guest || "1")) === 1
                                      ? "guest"
                                      : "guests"}
                                  </span>
                                </div>
                              </div>

                              {guest.Message && (
                                <div className="mt-2.5 sm:mt-3 md:mt-4 pt-2.5 sm:pt-3 md:pt-4 border-t" style={{ borderColor: "rgba(166,124,82,0.25)" }}>
                                  <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
                                    <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 mt-0.5" style={{ color: "#A67C52" }} />
                                    <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] leading-relaxed italic flex-1" style={{ color: "#7A4E2E" }}>
                                      "{guest.Message}"
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Carousel indicators - only show if more than 5 guests */}
                    {guests.length > 5 && (
                      <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
                        {Array.from({ length: Math.ceil(guests.length / 5) }).map((_, idx) => {
                          const pageIndex = Math.floor(currentIndex / 5);
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                setIsTransitioning(true);
                                setTimeout(() => {
                                  setCurrentIndex(idx * 5);
                                  setIsTransitioning(false);
                                }, 600);
                              }}
                              className="h-2 rounded-full transition-all duration-300"
                              style={{
                                width: pageIndex === idx ? "2rem" : "0.5rem",
                                backgroundColor: pageIndex === idx ? "#7A4E2E" : "#A67C52",
                              }}
                              aria-label={`Go to page ${idx + 1}`}
                            />
                          );
                        })}
                      </div>
                    )}

                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
