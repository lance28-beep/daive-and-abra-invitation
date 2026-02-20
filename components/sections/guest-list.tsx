"use client";

import { useState, useEffect, useRef } from "react";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import {
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  MessageSquare,
  RefreshCw,
  X,
  Heart,
  Sparkles,
  Phone,
  UserPlus,
} from "lucide-react";

interface Guest {
  Name: string;
  Email: string;
  RSVP: string;
  Guest: string;
  Message: string;
}

export function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [requestSuccess, setRequestSuccess] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    RSVP: "",
    Guest: "1",
    Message: "",
  });

  // Request form state
  const [requestFormData, setRequestFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Guest: "1",
    Message: "",
  });

  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch all guests on component mount
  useEffect(() => {
    fetchGuests();
  }, []);

  // Filter guests based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredGuests([]);
      setIsSearching(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = guests.filter((guest) =>
      guest.Name.toLowerCase().includes(query),
    );

    setFilteredGuests(filtered);
    setIsSearching(filtered.length > 0);
  }, [searchQuery, guests]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearching(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchGuests = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/guests");
      if (!response.ok) {
        throw new Error("Failed to fetch guests");
      }
      const data = await response.json();
      setGuests(data);
    } catch (error) {
      console.error("Error fetching guests:", error);
      setError("Failed to load guest list");
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSelect = (guest: Guest) => {
    setSelectedGuest(guest);
    setSearchQuery(guest.Name);
    setIsSearching(false);

    // Set form data with existing guest info
    setFormData({
      Name: guest.Name,
      Email: guest.Email && guest.Email !== "Pending" ? guest.Email : "",
      RSVP: guest.RSVP || "",
      Guest: guest.Guest && guest.Guest !== "" ? guest.Guest : "1",
      Message: guest.Message || "",
    });

    // Check if guest has already responded
    setHasResponded(!!(guest.RSVP && guest.RSVP.trim() !== ""));

    // Show modal
    setShowModal(true);
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitRSVP = async () => {
    if (!selectedGuest) return;

    if (!formData.RSVP) {
      setError("Please select if you can attend");
      setTimeout(() => setError(null), 5000);
      return;
    }

    // Validate guest count if attending
    if (
      formData.RSVP === "Yes" &&
      (!formData.Guest || parseInt(formData.Guest) < 1)
    ) {
      setError("Please enter the number of guests (minimum 1)");
      setTimeout(() => setError(null), 5000);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/guests", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          originalName: selectedGuest.Name,
          Name: formData.Name,
          Email: formData.Email || "Pending",
          RSVP: formData.RSVP,
          Guest: formData.RSVP === "Yes" ? formData.Guest || "1" : "0",
          Message: formData.Message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit RSVP");
      }

      // Show success and close modal after delay
      setSuccess("Thank you for your response!");
      setHasResponded(true);

      // Trigger event to refresh Book of Guests
      window.dispatchEvent(new Event("rsvpUpdated"));

      // Close modal and reset after showing success
      setTimeout(() => {
        setShowModal(false);
        setSearchQuery("");
        setSelectedGuest(null);
        setSuccess(null);
        fetchGuests();
      }, 3000);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setError("Failed to submit RSVP. Please try again.");
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGuest(null);
    setSearchQuery("");
    setFormData({ Name: "", Email: "", RSVP: "", Guest: "1", Message: "" });
    setHasResponded(false);
    setError(null);
  };

  const handleSubmitRequest = async () => {
    if (!requestFormData.Name) {
      setError("Name is required");
      setTimeout(() => setError(null), 5000);
      return;
    }

    setIsLoading(true);
    setError(null);
    setRequestSuccess(null);

    try {
      const response = await fetch("/api/guest-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      setRequestSuccess("Request submitted! We'll review and get back to you.");

      // Close modal and reset after showing success
      setTimeout(() => {
        setShowRequestModal(false);
        setRequestFormData({
          Name: "",
          Email: "",
          Phone: "",
          Guest: "1",
          Message: "",
        });
        setSearchQuery("");
        setRequestSuccess(null);
      }, 3000);
    } catch (error) {
      console.error("Error submitting request:", error);
      setError("Failed to submit request. Please try again.");
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseRequestModal = () => {
    setShowRequestModal(false);
    setRequestFormData({
      Name: "",
      Email: "",
      Phone: "",
      Guest: "1",
      Message: "",
    });
    setError(null);
    setRequestSuccess(null);
  };

  return (
    <Section
      id="guest-list"
      className="relative z-[60] isolate py-8 sm:py-12 md:py-16 lg:py-20 bg-transparent overflow-visible"
    >
      {/* Section Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal mb-4 sm:mb-6 uppercase tracking-[0.12em] sm:tracking-[0.15em]" style={{ color: "#F5D8B0" }}>
          RSVP
        </h2>
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-normal max-w-xl mx-auto leading-relaxed tracking-wide px-4" style={{ color: "#A2976A" }}>
            Please search for your name below to confirm your attendance and help us prepare for this special celebration
          </p>
          <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-normal max-w-xl mx-auto leading-relaxed tracking-wide px-4" style={{ color: "rgba(245,216,176,0.9)" }}>
            RSVP deadline: May 19, 2026
          </p>
        </div>
      </div>

      {/* Search Section — container same as timeline/entourage */}
      <div className="relative z-10 max-w-3xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="relative group">
          <div
            className="relative rounded-xl sm:rounded-2xl overflow-visible transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #45301F 0%, #875F2C 40%, #45301F 100%)",
              boxShadow: "0 0 0 1px rgba(163,151,106,0.25), 0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(245,216,176,0.06)",
              overflow: "visible",
            }}
          >
            <div className="absolute inset-0 opacity-50 z-0 rounded-xl sm:rounded-2xl" style={{ background: "radial-gradient(circle at center, rgba(245,216,176,0.04) 0%, transparent 70%)" }} />
            <div
              className="absolute inset-0 rounded-xl sm:rounded-2xl z-0"
              style={{
                padding: "1px",
                background: "linear-gradient(135deg, rgba(245,216,176,0.2) 0%, rgba(163,151,106,0.15) 50%, rgba(245,216,176,0.15) 100%)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <div className="absolute inset-[1px] rounded-xl sm:rounded-2xl border border-[rgba(163,151,106,0.3)] z-0" />
            <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="relative z-10 space-y-4 sm:space-y-5">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="p-1.5 sm:p-2 rounded-xl shadow-lg border" style={{ backgroundColor: "rgba(69,48,31,0.6)", borderColor: "rgba(163,151,106,0.3)" }}>
                    <Search className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: "#F5D8B0" }} />
                  </div>
                  <div>
                    <label className="block text-sm sm:text-base md:text-lg font-normal font-[family-name:var(--font-crimson)] mb-0.5 sm:mb-1" style={{ color: "#F5D8B0" }}>
                      Find Your Name
                    </label>
                    <p className="text-[10px] sm:text-xs font-[family-name:var(--font-crimson)]" style={{ color: "#A2976A" }}>
                      Type as you search to see instant results
                    </p>
                  </div>
                </div>
                <div ref={searchRef} className="relative overflow-visible" style={{ zIndex: 50 }}>
                  <div className="relative">
                    <Search className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 pointer-events-none" style={{ color: "#A2976A" }} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Type your name..."
                      className="w-full pl-9 sm:pl-12 pr-3 sm:pr-5 py-2.5 sm:py-3.5 md:py-4 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] transition-all duration-300 focus:ring-4 shadow-inner focus:shadow-lg"
                      style={{
                        backgroundColor: "rgba(69,48,31,0.5)",
                        borderColor: "rgba(163,151,106,0.35)",
                        color: "#F5D8B0",
                      }}
                    />
                  </div>
                  {isSearching && filteredGuests.length > 0 && (
                    <div
                      className="absolute z-50 w-full mt-2 sm:mt-3 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden"
                      style={{
                        position: "absolute",
                        top: "100%",
                        zIndex: 50,
                        backgroundColor: "rgba(69,48,31,0.98)",
                        border: "1px solid rgba(163,151,106,0.4)",
                      }}
                    >
                      <div className="relative">
                        {filteredGuests.map((guest, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearchSelect(guest)}
                            className="w-full px-4 sm:px-5 py-3.5 sm:py-4 text-left transition-all duration-200 flex items-center gap-3 sm:gap-4 border-b last:border-b-0 group"
                            style={{ borderColor: "rgba(163,151,106,0.25)" }}
                          >
                            <div className="relative flex-shrink-0">
                              <div className="p-1.5 sm:p-2 rounded-full shadow-md transition-all duration-300 border" style={{ backgroundColor: "rgba(135,95,44,0.5)", borderColor: "rgba(163,151,106,0.3)" }}>
                                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: "#F5D8B0" }} />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-normal text-sm sm:text-base font-[family-name:var(--font-crimson)] transition-colors duration-200 truncate group-hover:opacity-95" style={{ color: "#F5D8B0" }}>
                                {guest.Name}
                              </div>
                              {guest.Email && guest.Email !== "Pending" && (
                                <div className="text-[10px] sm:text-xs font-[family-name:var(--font-crimson)] truncate mt-0.5" style={{ color: "#A2976A" }}>
                                  {guest.Email}
                                </div>
                              )}
                            </div>
                            <div className="flex-shrink-0 group-hover:translate-x-1 transition-all duration-200" style={{ color: "#A2976A" }}>
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {searchQuery && filteredGuests.length === 0 && (
                    <div
                      className="absolute z-50 w-full mt-2 sm:mt-3 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden"
                      style={{
                        position: "absolute",
                        top: "100%",
                        zIndex: 50,
                        backgroundColor: "rgba(69,48,31,0.98)",
                        border: "1px solid rgba(163,151,106,0.4)",
                      }}
                    >
                      <div className="p-4 sm:p-5">
                        <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                          <div className="p-1.5 sm:p-2 rounded-xl flex-shrink-0 shadow-md border" style={{ backgroundColor: "rgba(135,95,44,0.5)", borderColor: "rgba(163,151,106,0.3)" }}>
                            <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: "#F5D8B0" }} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-normal text-sm sm:text-base font-[family-name:var(--font-crimson)] mb-1" style={{ color: "#F5D8B0" }}>
                              Not finding your name?
                            </h4>
                            <p className="text-xs sm:text-sm font-[family-name:var(--font-crimson)] leading-relaxed" style={{ color: "#A2976A" }}>
                              We'd love to have you with us! Send a request to join the celebration.
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => {
                            setRequestFormData({ ...requestFormData, Name: searchQuery });
                            setShowRequestModal(true);
                          }}
                          className="w-full py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-[family-name:var(--font-crimson)] font-normal shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border"
                          style={{ backgroundColor: "#875F2C", color: "#F5D8B0", borderColor: "rgba(163,151,106,0.5)" }}
                        >
                          <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 mr-2 inline" />
                          Request to Join
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-1.5 sm:p-3 md:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div
            className="relative w-full max-w-md sm:max-w-2xl mx-1.5 sm:mx-3 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[98vh] flex flex-col"
            style={{
              background: "linear-gradient(135deg, #45301F 0%, #875F2C 40%, #45301F 100%)",
              boxShadow: "0 0 0 1px rgba(163,151,106,0.3), 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(245,216,176,0.06)",
            }}
          >
            <div className="absolute inset-0 opacity-50 z-0" style={{ background: "radial-gradient(circle at center, rgba(245,216,176,0.04) 0%, transparent 70%)" }} />
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl z-0" style={{ border: "1px solid rgba(163,151,106,0.35)" }} />

            <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex-shrink-0 border-b" style={{ backgroundColor: "rgba(69,48,31,0.6)", borderColor: "rgba(163,151,106,0.3)" }}>
              <div className="relative flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0" style={{ backgroundColor: "rgba(163,151,106,0.4)" }}>
                      <Heart className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" style={{ color: "#F5D8B0" }} />
                    </div>
                    <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-crimson)] font-normal truncate" style={{ color: "#F5D8B0" }}>
                      You're Invited!
                    </h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] font-normal leading-tight sm:leading-normal" style={{ color: "rgba(245,216,176,0.95)" }}>
                      Hello <span className="font-bold" style={{ color: "#F5D8B0" }}>{selectedGuest?.Name}</span>, you are invited to our wedding!
                    </p>
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 backdrop-blur-sm rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 border" style={{ backgroundColor: "rgba(163,151,106,0.2)", borderColor: "rgba(163,151,106,0.3)" }}>
                      <User className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: "#F5D8B0" }} />
                      <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-normal" style={{ color: "#F5D8B0" }}>
                        We have reserved <span className="font-bold">{selectedGuest?.Guest || "1"}</span> seat{selectedGuest?.Guest && parseInt(selectedGuest.Guest) > 1 ? "s" : ""} for you
                      </p>
                    </div>
                  </div>
                </div>
                {!hasResponded && (
                  <button
                    onClick={handleCloseModal}
                    className="transition-colors p-1 sm:p-2 rounded-full flex-shrink-0 hover:opacity-80"
                    style={{ color: "#F5D8B0" }}
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Modal Content */}
            <div className="relative z-10 p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto flex-1 min-h-0">
              {hasResponded ? (
                <div className="text-center py-3 sm:py-6 md:py-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full mb-3 sm:mb-4 md:mb-6 border" style={{ backgroundColor: "rgba(163,151,106,0.3)", borderColor: "rgba(163,151,106,0.5)" }}>
                    <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" style={{ color: "#F5D8B0" }} />
                  </div>
                  <h4 className="text-base sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-normal mb-2 sm:mb-3" style={{ color: "#F5D8B0" }}>
                    Thank You for Responding!
                  </h4>
                  <p className="font-[family-name:var(--font-crimson)] text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-6 px-2" style={{ color: "#A2976A" }}>
                    We've received your RSVP and look forward to celebrating with you!
                  </p>
                  <div className="rounded-xl p-3 sm:p-4 md:p-6 border space-y-2.5 sm:space-y-3 md:space-y-4" style={{ backgroundColor: "rgba(69,48,31,0.5)", borderColor: "rgba(163,151,106,0.3)" }}>
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                      {selectedGuest?.RSVP === "Yes" && (
                        <>
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-400" />
                          <span className="text-sm sm:text-base md:text-lg font-normal font-[family-name:var(--font-crimson)] text-green-400">You're Attending!</span>
                        </>
                      )}
                      {selectedGuest?.RSVP === "No" && (
                        <>
                          <XCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-red-400" />
                          <span className="text-sm sm:text-base md:text-lg font-normal font-[family-name:var(--font-crimson)] text-red-400">Unable to Attend</span>
                        </>
                      )}
                    </div>
                    {selectedGuest?.RSVP === "Yes" && selectedGuest?.Guest && (
                      <div className="rounded-lg p-2.5 sm:p-3 md:p-4 border" style={{ backgroundColor: "rgba(69,48,31,0.4)", borderColor: "rgba(163,151,106,0.25)" }}>
                        <div className="text-center">
                          <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] mb-0.5 sm:mb-1 font-normal" style={{ color: "#A2976A" }}>Number of Guests</p>
                          <p className="text-xl sm:text-2xl md:text-3xl font-bold font-[family-name:var(--font-crimson)]" style={{ color: "#F5D8B0" }}>{selectedGuest.Guest || "1"}</p>
                        </div>
                      </div>
                    )}
                    {selectedGuest?.Message?.trim() && (
                      <div className="pt-2 sm:pt-3 border-t" style={{ borderColor: "rgba(163,151,106,0.3)" }}>
                        <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] italic px-1" style={{ color: "rgba(245,216,176,0.9)" }}>"{selectedGuest.Message}"</p>
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={handleCloseModal}
                    className="mt-3 sm:mt-4 md:mt-6 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-xl text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-normal transition-all duration-300 border"
                    style={{ backgroundColor: "#875F2C", color: "#F5D8B0", borderColor: "rgba(163,151,106,0.5)" }}
                  >
                    Close
                  </Button>
                </div>
              ) : (
                // RSVP Form for guests who haven't responded
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmitRSVP();
                  }}
                  className="space-y-2.5 sm:space-y-3 md:space-y-4 lg:space-y-5"
                >
                  {/* Can you attend? */}
                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-normal mb-1.5 sm:mb-2 md:mb-4 font-[family-name:var(--font-crimson)]" style={{ color: "#F5D8B0" }}>
                      <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" style={{ color: "#A2976A" }} />
                      <span className="leading-tight">Can you attend? *</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, RSVP: "Yes" }))
                        }
                        className="relative p-2 sm:p-3 md:p-4 lg:p-6 rounded-xl sm:rounded-2xl border-2 sm:border-4 transition-all duration-300 hover:shadow-md"
                        style={{
                          borderColor: formData.RSVP === "Yes" ? "rgb(34, 197, 94)" : "rgba(163,151,106,0.4)",
                          backgroundColor: formData.RSVP === "Yes" ? "rgba(34, 197, 94, 0.2)" : "rgba(69,48,31,0.5)",
                          transform: formData.RSVP === "Yes" ? "scale(1.02)" : undefined,
                        }}
                      >
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3">
                          <CheckCircle
                            className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 flex-shrink-0 ${
                              formData.RSVP === "Yes"
                                ? "text-green-400"
                                : "text-zinc-500"
                            }`}
                          />
                          <span
                            className="text-xs sm:text-sm md:text-base lg:text-xl font-bold font-[family-name:var(--font-crimson)]"
                            style={{ color: formData.RSVP === "Yes" ? "rgb(74, 222, 128)" : "#F5D8B0" }}
                          >
                            Yes!
                          </span>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, RSVP: "No" }))
                        }
                        className="relative p-2 sm:p-3 md:p-4 lg:p-6 rounded-xl sm:rounded-2xl border-2 sm:border-4 transition-all duration-300 hover:shadow-md"
                        style={{
                          borderColor: formData.RSVP === "No" ? "rgb(248, 113, 113)" : "rgba(163,151,106,0.4)",
                          backgroundColor: formData.RSVP === "No" ? "rgba(248, 113, 113, 0.15)" : "rgba(69,48,31,0.5)",
                          transform: formData.RSVP === "No" ? "scale(1.02)" : undefined,
                        }}
                      >
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3">
                          <XCircle
                            className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 flex-shrink-0 ${
                              formData.RSVP === "No"
                                ? "text-red-400"
                                : "text-zinc-500"
                            }`}
                          />
                          <span
                            className="text-xs sm:text-sm md:text-base lg:text-xl font-bold font-[family-name:var(--font-crimson)]"
                            style={{ color: formData.RSVP === "No" ? "rgb(248, 113, 113)" : "#F5D8B0" }}
                          >
                            Sorry, No
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Number of Guests - Only show when RSVP is "Yes" */}
                  {formData.RSVP === "Yes" && (
                    <div>
                      <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-normal mb-1.5 sm:mb-2 md:mb-3 font-[family-name:var(--font-crimson)]" style={{ color: "#F5D8B0" }}>
                        <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" style={{ color: "#A2976A" }} />
                        <span className="leading-tight">Number of Guests *</span>
                      </label>
                      <input
                        type="number"
                        name="Guest"
                        value={formData.Guest}
                        onChange={handleFormChange}
                        min="1"
                        required
                        placeholder="How many guests?"
                        className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] transition-all duration-300 focus:ring-2 sm:focus:ring-4 focus:ring-white/10"
                        style={{ backgroundColor: "rgba(69,48,31,0.5)", borderColor: "rgba(163,151,106,0.35)", color: "#F5D8B0" }}
                      />
                    </div>
                  )}

                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-normal mb-1.5 sm:mb-2 md:mb-3 font-[family-name:var(--font-crimson)] flex-wrap" style={{ color: "#F5D8B0" }}>
                      <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" style={{ color: "#A2976A" }} />
                      <span className="leading-tight">Your Message to the Couple</span>
                      <span className="text-[10px] sm:text-xs md:text-sm font-normal" style={{ color: "#A2976A" }}>(Optional)</span>
                    </label>
                    <textarea
                      name="Message"
                      value={formData.Message}
                      onChange={handleFormChange}
                      placeholder="Share your excitement..."
                      rows={3}
                      className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] transition-all duration-300 focus:ring-2 sm:focus:ring-4 focus:ring-white/10 resize-none"
                      style={{ backgroundColor: "rgba(69,48,31,0.5)", borderColor: "rgba(163,151,106,0.35)", color: "#F5D8B0" }}
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-normal mb-1.5 sm:mb-2 md:mb-3 font-[family-name:var(--font-crimson)] flex-wrap" style={{ color: "#F5D8B0" }}>
                      <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" style={{ color: "#A2976A" }} />
                      <span className="leading-tight">Your Email Address</span>
                      <span className="text-[10px] sm:text-xs md:text-sm font-normal" style={{ color: "#A2976A" }}>(Optional)</span>
                    </label>
                    <input
                      type="email"
                      name="Email"
                      value={formData.Email}
                      onChange={handleFormChange}
                      placeholder="your.email@example.com"
                      className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] transition-all duration-300 focus:ring-2 sm:focus:ring-4 focus:ring-white/10"
                      style={{ backgroundColor: "rgba(69,48,31,0.5)", borderColor: "rgba(163,151,106,0.35)", color: "#F5D8B0" }}
                    />
                  </div>

                  <div className="pt-2 sm:pt-3 md:pt-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] font-normal shadow-xl transition-all duration-300 hover:shadow-2xl disabled:opacity-70 min-h-[40px] sm:min-h-[44px] md:min-h-[48px] border"
                      style={{ backgroundColor: "#875F2C", color: "#F5D8B0", borderColor: "rgba(163,151,106,0.5)" }}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                          <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                          <span className="text-xs sm:text-sm md:text-base">
                            Submitting...
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                          <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                          <span className="text-xs sm:text-sm md:text-base">
                            Submit RSVP
                          </span>
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {success && (
              <div className="absolute inset-0 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-300 p-4" style={{ background: "linear-gradient(135deg, rgba(69,48,31,0.98) 0%, rgba(135,95,44,0.98) 50%, rgba(69,48,31,0.98) 100%)" }}>
                <div className="text-center p-4 sm:p-6 md:p-8 max-w-sm mx-auto">
                  {/* Enhanced Icon Circle */}
                  <div className="relative inline-flex items-center justify-center mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                    {/* Animated rings */}
                    <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-white/20 animate-ping" />
                    <div className="absolute inset-0 rounded-full border-2 border-white/30" />
                    {/* Icon container */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-xl" style={{ backgroundColor: "#F5D8B0" }}>
                      <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" style={{ color: "#45301F" }} strokeWidth={2.5} />
                    </div>
                  </div>
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-crimson)] font-bold mb-2 sm:mb-3 md:mb-4" style={{ color: "#F5D8B0" }}>
                    RSVP Confirmed!
                  </h4>

                  {/* Message based on RSVP response */}
                  {formData.RSVP === "Yes" && (
                    <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 md:mb-5">
                      <p className="font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg font-normal" style={{ color: "rgba(245,216,176,0.95)" }}>We're thrilled you'll be joining us!</p>
                      <p className="font-[family-name:var(--font-crimson)] text-xs sm:text-sm md:text-base" style={{ color: "#A2976A" }}>Your response has been recorded</p>
                    </div>
                  )}
                  {formData.RSVP === "No" && (
                    <p className="font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-5" style={{ color: "rgba(245,216,176,0.9)" }}>We'll miss you, but thank you for letting us know.</p>
                  )}
                  {!formData.RSVP && (
                    <p className="font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-5" style={{ color: "rgba(245,216,176,0.9)" }}>Thank you for your response!</p>
                  )}
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 md:mt-5">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full animate-pulse bg-[#A2976A]" />
                    <p className="font-[family-name:var(--font-crimson)] text-[10px] sm:text-xs md:text-sm" style={{ color: "#A2976A" }}>This will close automatically</p>
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full animate-pulse bg-[#A2976A]" />
                  </div>
                </div>
              </div>
            )}

            {error && !success && (
              <div className="px-2.5 sm:px-4 md:px-6 lg:px-8 pb-2.5 sm:pb-4 md:pb-6">
                <div className="bg-red-900/30 border-2 border-red-500/30 rounded-xl p-2.5 sm:p-3 md:p-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 flex-shrink-0" />
                    <span className="text-red-400 font-semibold font-[family-name:var(--font-crimson)] text-xs sm:text-sm">
                      {error}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Request to Join Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-1.5 sm:p-3 md:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div
            className="relative w-full max-w-md sm:max-w-2xl mx-1.5 sm:mx-3 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[98vh] flex flex-col"
            style={{
              background: "linear-gradient(135deg, #45301F 0%, #875F2C 40%, #45301F 100%)",
              boxShadow: "0 0 0 1px rgba(163,151,106,0.3), 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(245,216,176,0.06)",
            }}
          >
            <div className="absolute inset-0 opacity-50 z-0" style={{ background: "radial-gradient(circle at center, rgba(245,216,176,0.04) 0%, transparent 70%)" }} />
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl z-0" style={{ border: "1px solid rgba(163,151,106,0.35)" }} />

            <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex-shrink-0 border-b" style={{ backgroundColor: "rgba(69,48,31,0.6)", borderColor: "rgba(163,151,106,0.3)" }}>
              <div className="relative flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0 border" style={{ backgroundColor: "rgba(163,151,106,0.4)", borderColor: "rgba(163,151,106,0.3)" }}>
                      <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" style={{ color: "#F5D8B0" }} />
                    </div>
                    <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-crimson)] font-normal truncate" style={{ color: "#F5D8B0" }}>
                      Request to Join
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-normal leading-tight sm:leading-normal" style={{ color: "#A2976A" }}>
                    {requestFormData.Name ? (
                      <>Hi <span className="font-bold" style={{ color: "#F5D8B0" }}>{requestFormData.Name}</span> — want to celebrate with us? Send a request!</>
                    ) : (
                      <>Want to celebrate with us? Send a request!</>
                    )}
                  </p>
                </div>
                <button onClick={handleCloseRequestModal} className="transition-colors p-1 sm:p-1.5 md:p-2 rounded-full flex-shrink-0 hover:opacity-80" style={{ color: "#F5D8B0" }}>
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="relative z-10 p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto flex-1 min-h-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitRequest();
                }}
                className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6"
              >
                <div>
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-normal mb-1.5 sm:mb-2 md:mb-3 font-[family-name:var(--font-crimson)]" style={{ color: "#F5D8B0" }}>
                    <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" style={{ color: "#A2976A" }} />
                    <span className="leading-tight">Full Name *</span>
                  </label>
                  <input
                    type="text"
                    name="Name"
                    value={requestFormData.Name}
                    onChange={(e) => setRequestFormData({ ...requestFormData, Name: e.target.value })}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] transition-all duration-300 focus:ring-2 sm:focus:ring-4 focus:ring-white/10"
                    style={{ backgroundColor: "rgba(69,48,31,0.5)", borderColor: "rgba(163,151,106,0.35)", color: "#F5D8B0" }}
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-normal mb-1.5 sm:mb-2 md:mb-3 font-[family-name:var(--font-crimson)] flex-wrap" style={{ color: "#F5D8B0" }}>
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" style={{ color: "#A2976A" }} />
                    <span className="leading-tight">Email Address</span>
                    <span className="text-[10px] sm:text-xs md:text-sm font-normal" style={{ color: "#A2976A" }}>(Optional)</span>
                  </label>
                  <input
                    type="email"
                    name="Email"
                    value={requestFormData.Email}
                    onChange={(e) => setRequestFormData({ ...requestFormData, Email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] transition-all duration-300 focus:ring-2 sm:focus:ring-4 focus:ring-white/10"
                    style={{ backgroundColor: "rgba(69,48,31,0.5)", borderColor: "rgba(163,151,106,0.35)", color: "#F5D8B0" }}
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-normal mb-1.5 sm:mb-2 md:mb-3 font-[family-name:var(--font-crimson)] flex-wrap" style={{ color: "#F5D8B0" }}>
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" style={{ color: "#A2976A" }} />
                    <span className="leading-tight">Phone Number</span>
                    <span className="text-[10px] sm:text-xs md:text-sm font-normal" style={{ color: "#A2976A" }}>(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="Phone"
                    value={requestFormData.Phone}
                    onChange={(e) => setRequestFormData({ ...requestFormData, Phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] transition-all duration-300 focus:ring-2 sm:focus:ring-4 focus:ring-white/10"
                    style={{ backgroundColor: "rgba(69,48,31,0.5)", borderColor: "rgba(163,151,106,0.35)", color: "#F5D8B0" }}
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-normal mb-1.5 sm:mb-2 md:mb-3 font-[family-name:var(--font-crimson)]" style={{ color: "#F5D8B0" }}>
                    <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" style={{ color: "#A2976A" }} />
                    <span className="leading-tight">Number of Guests *</span>
                  </label>
                  <input
                    type="number"
                    name="Guest"
                    value={requestFormData.Guest}
                    onChange={(e) => setRequestFormData({ ...requestFormData, Guest: e.target.value })}
                    min="1"
                    required
                    placeholder="How many guests?"
                    className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] transition-all duration-300 focus:ring-2 sm:focus:ring-4 focus:ring-white/10"
                    style={{ backgroundColor: "rgba(69,48,31,0.5)", borderColor: "rgba(163,151,106,0.35)", color: "#F5D8B0" }}
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-normal mb-1.5 sm:mb-2 md:mb-3 font-[family-name:var(--font-crimson)] flex-wrap" style={{ color: "#F5D8B0" }}>
                    <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" style={{ color: "#A2976A" }} />
                    <span className="leading-tight">Message</span>
                    <span className="text-[10px] sm:text-xs md:text-sm font-normal" style={{ color: "#A2976A" }}>(Optional)</span>
                  </label>
                  <textarea
                    name="Message"
                    value={requestFormData.Message}
                    onChange={(e) => setRequestFormData({ ...requestFormData, Message: e.target.value })}
                    placeholder="Share why you'd like to join..."
                    rows={3}
                    className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] transition-all duration-300 focus:ring-2 sm:focus:ring-4 focus:ring-white/10 resize-none"
                    style={{ backgroundColor: "rgba(69,48,31,0.5)", borderColor: "rgba(163,151,106,0.35)", color: "#F5D8B0" }}
                  />
                </div>
                <div className="pt-2 sm:pt-3 md:pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-normal shadow-xl transition-all duration-300 hover:shadow-2xl disabled:opacity-70 min-h-[40px] sm:min-h-[44px] md:min-h-[48px] border"
                    style={{ backgroundColor: "#875F2C", color: "#F5D8B0", borderColor: "rgba(163,151,106,0.5)" }}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                        <span className="text-xs sm:text-sm md:text-base">
                          Submitting...
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="text-xs sm:text-sm md:text-base">
                          Send Request
                        </span>
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {requestSuccess && (
              <div className="absolute inset-0 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-300 p-4 rounded-xl sm:rounded-2xl md:rounded-3xl" style={{ background: "linear-gradient(135deg, rgba(69,48,31,0.98) 0%, rgba(135,95,44,0.98) 50%, rgba(69,48,31,0.98) 100%)", border: "1px solid rgba(163,151,106,0.3)" }}>
                <div className="text-center p-4 sm:p-6 md:p-8 max-w-sm mx-auto">
                  <div className="relative inline-flex items-center justify-center mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                    <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-[#A2976A]/30 animate-ping" />
                    <div className="absolute inset-0 rounded-full border-2 border-[#A2976A]/40" />
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-xl" style={{ backgroundColor: "#F5D8B0" }}>
                      <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" style={{ color: "#45301F" }} strokeWidth={2.5} />
                    </div>
                  </div>
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-crimson)] font-bold mb-2 sm:mb-3 md:mb-4" style={{ color: "#F5D8B0" }}>
                    Request Sent!
                  </h4>
                  <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 md:mb-5">
                    <p className="font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg font-normal" style={{ color: "rgba(245,216,176,0.95)" }}>We've received your request</p>
                    <p className="font-[family-name:var(--font-crimson)] text-xs sm:text-sm md:text-base" style={{ color: "#A2976A" }}>We'll review it and get back to you soon</p>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 md:mt-5">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full animate-pulse bg-[#A2976A]" />
                    <p className="font-[family-name:var(--font-crimson)] text-[10px] sm:text-xs md:text-sm" style={{ color: "#A2976A" }}>This will close automatically</p>
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full animate-pulse bg-[#A2976A]" />
                  </div>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && !requestSuccess && (
              <div className="px-2.5 sm:px-4 md:px-6 lg:px-8 pb-2.5 sm:pb-4 md:pb-6">
                <div className="bg-red-900/30 border-2 border-red-500/30 rounded-xl p-2.5 sm:p-3 md:p-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 flex-shrink-0" />
                    <span className="text-red-400 font-semibold font-[family-name:var(--font-crimson)] text-xs sm:text-sm">
                      {error}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Status Messages (outside modals) */}
      {success && !showModal && !showRequestModal && !requestSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[110] max-w-md w-full mx-4">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 sm:p-4 shadow-lg animate-in slide-in-from-top">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <span className="text-green-600 font-semibold font-[family-name:var(--font-crimson)] text-sm sm:text-base">
                {success}
              </span>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
